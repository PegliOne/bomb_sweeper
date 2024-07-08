class PlaysController < ApplicationController
  include ApplicationHelper
  skip_before_action :verify_authenticity_token, only: [:create, :update]
  
  def index
    @easy_plays = get_and_order_displayable_plays(filter_plays_by_difficulty(Play.all, "easy"))
    @medium_plays = get_and_order_displayable_plays(filter_plays_by_difficulty(Play.all, "medium"))
    @hard_plays = get_and_order_displayable_plays(filter_plays_by_difficulty(Play.all, "hard"))
    if @easy_plays.empty? && @medium_plays.empty? && @hard_plays.empty?
      @intro_text = "No times have been submitted yet."
    elsif
      @intro_text = "The top scoring plays are the successful plays with the shortest times."  
    end    
  end

  def create
    user = fetch_user
    unless user.nil? 
      play = Play.create(play_params)   
      play.user_id = user.id
      play.save
    end
  end

  def update
    play = Play.last
    play.is_displayed = true
    play.save
  end  
  
  private

  def play_params
    params.permit(:difficulty, :is_win,:time_in_seconds)
  end
end