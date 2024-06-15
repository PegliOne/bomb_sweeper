class PlaysController < ApplicationController
  include ApplicationHelper
  skip_before_action :verify_authenticity_token, only: [:create, :update]
  
  def index
    @easy_plays = filter_plays_by_difficulty(winning_plays, "easy")
    @medium_plays = filter_plays_by_difficulty(winning_plays, "medium")
    @hard_plays = filter_plays_by_difficulty(winning_plays, "hard")
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

  def winning_plays
    get_winning_plays(Play.all)
  end  

  def play_params
    params.permit(:difficulty, :is_win,:time_in_seconds)
  end
end