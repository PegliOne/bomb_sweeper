class UsersController < ApplicationController
  def new
  end

  def show
    @user = User.find_by(username: 'PegliOne')
  end  
end