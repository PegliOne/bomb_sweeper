class PagesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def home
    if params[:difficulty].present? && ["easy", "medium", "hard"].include?(params[:difficulty].downcase)
      @difficulty = params[:difficulty]
    else  
      @difficulty = "medium"
    end  
  end 
  
  def not_found
  end  
end 