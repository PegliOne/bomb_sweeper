class SessionsController < ApplicationController
  def new
  end

  def destroy
    puts "Signing Out User"
    redirect_to '/'
  end  
end 