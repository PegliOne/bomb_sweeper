class UsersController < ApplicationController
  include ApplicationHelper
  before_action :check_user_logged_in, only: [:show]
  before_action :check_user_not_logged_in, only: [:new, :create]
  
  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path
    end
  end

  def show
    @user = user
    @win_percentage = (winning_plays.count / play_count) * 100
    @quickest_winning_play_time = quickest_winning_play.time_in_seconds
    @quickest_winning_play_difficulty = quickest_winning_play.difficulty
    @easy_plays = filter_plays_by_difficulty(winning_plays, "Easy")
    @medium_plays = filter_plays_by_difficulty(winning_plays, "Medium")
    @hard_plays = filter_plays_by_difficulty(winning_plays, "Hard")
  end  

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def user
    User.find(@current_user.id)
  end  

  def winning_plays
    user.plays.filter{ |play| play.is_win }
  end 

  def play_count
    user.plays.count.to_f
  end

  def quickest_winning_play
    winning_plays.sort_by(&:time_in_seconds).first
  end
end