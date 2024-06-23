class UsersController < ApplicationController
  include ApplicationHelper
  before_action :check_user_logged_in, only: [:show]
  before_action :check_user_not_logged_in, only: [:new, :create]
  
  def new
    @user = User.new
  end

  def create
    return unless is_user_valid?
    @user = User.create(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path
    end  
  end

  def show
    @user = user
    @quickest_winning_play_time = quickest_winning_play&.time_in_seconds
    @quickest_winning_play_difficulty = quickest_winning_play&.difficulty&.capitalize
    @easy_plays = filter_plays_by_difficulty(user.plays, "easy")
    @medium_plays = filter_plays_by_difficulty(user.plays, "medium")
    @hard_plays = filter_plays_by_difficulty(user.plays, "hard")
    unless @easy_plays.count == 0
      @easy_win_percentage = (get_all_winning_plays(@easy_plays).count * 100 / @easy_plays.count).round(2)
    end  
    unless @medium_plays.count == 0
      @medium_win_percentage = (get_all_winning_plays(@medium_plays).count * 100 / @medium_plays.count).round(2)
    end 
    unless @hard_plays.count == 0
      @hard_win_percentage = (get_all_winning_plays(@hard_plays).count * 100 / @hard_plays.count).round(2)
    end 
  end  

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def is_user_valid?
    usernames = User.all.map{|user| user.username}
    emails = User.all.map{|user| user.email}
    if usernames.include?(user_params[:username])
      show_error "Error: Username Must Be Unique" 
      return false
    elsif emails.include?(user_params[:email])
      show_error "Error: Email Must Be Unique"
      return false
    elsif user_params[:password] != user_params[:password_confirmation]
      show_error "Error: Password Confirmation Must Match Password" 
      return false
    end    
    return true
  end

  def show_error error
    flash[:error] = error 
    redirect_to "/sign_up"
  end 

  def user
    User.find(@current_user.id)
  end  

  def get_all_winning_plays(plays)
    plays.filter{ |play| play.is_win }
  end 

  def play_count
    user.plays.count.to_f
  end

  def quickest_winning_play
    get_winning_plays(user.plays).sort_by(&:time_in_seconds).first
  end
end