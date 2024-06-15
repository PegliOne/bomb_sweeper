class ApplicationController < ActionController::Base
  before_action :fetch_user

  def check_user_logged_in
    redirect_to "/" unless session[:user_id].present?
  end

  def check_user_not_logged_in
    redirect_to "/" unless session[:user_id].nil?
  end  

  def get_winning_plays(plays)
    plays.filter{ |play| play.is_win && play.is_displayed }.sort_by(&:time_in_seconds)
  end  

  private

  def fetch_user
    @current_user = User.find_by(:id => session[:user_id]) if session[:user_id].present?
  end
end
