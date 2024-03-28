class SessionsController < ApplicationController
  before_action :check_user_logged_in, only: [:delete]
  before_action :check_user_not_logged_in, only: [:new, :create]
  
  def new
  end

  def create
    user = User.find_by(email: params[:email])
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path
    else
      flash[:error] = "Error: Email or Password Incorrect"
      redirect_to "/log_in" 
    end    
  end

  def destroy
    session[:user_id] = nil
    redirect_to "/"
  end
end