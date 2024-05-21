class PlaysController < ApplicationController
  include ApplicationHelper
  skip_before_action :verify_authenticity_token, only: :create
  
  def index
    @easy_plays = filter_plays_by_difficulty(winning_plays, "easy")
    @medium_plays = filter_plays_by_difficulty(winning_plays, "medium")
    @hard_plays = filter_plays_by_difficulty(winning_plays, "hard")
  end 

  def create
    user = fetch_user
    unless user.nil? 
      play = Play.create(play_params)   
      play.user_id = user.id
      play.save
    end
  end
  
  private

  def winning_plays
    Play.all.filter(&:is_win).sort_by(&:time_in_seconds)
  end  

  def play_params
    params.permit(:difficulty, :is_win,:time_in_seconds)
  end
end