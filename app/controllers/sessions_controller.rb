class SessionsController < ApplicationController
  before_action :check_user_logged_in, only: [:delete]
  before_action :check_user_not_logged_in, only: [:new, :create]
  
  def new
  end

  def create
    user = User.find_by(email: params[:email])
    return unless is_login_valid? user
    session[:user_id] = user.id
    redirect_to root_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to "/"
  end

  private

  def is_login_valid? user
    unless user.present? && user.authenticate(params[:password])
      flash[:error] = "Error: Incorrect Username or Password"
      redirect_to "/log_in"
      return false
    end  
    return true
  end
end