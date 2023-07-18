class ApplicationController < ActionController::Base
  before_action :fetch_user

  private

  def fetch_user
    @current_user = User.find_by(:id => session[:user_id]) if session[:user_id].present?
  end  
end
