class PagesController < ApplicationController
  def home
    if params[:difficulty].present? && ["easy", "medium", "hard"].include?(params[:difficulty].downcase)
      @difficulty = params[:difficulty]
    else  
      @difficulty = "easy"
    end  
  end  
end 