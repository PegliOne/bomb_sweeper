class PlaysController < ApplicationController
  include ApplicationHelper
  
  def index
    @easy_plays = filter_plays_by_difficulty(winning_plays, "Easy")
    @medium_plays = filter_plays_by_difficulty(winning_plays, "Medium")
    @hard_plays = filter_plays_by_difficulty(winning_plays, "Hard")
  end 

  def create
    puts "Play create called"
    user = fetch_user
    play = Play.create(play_params)
    unless user.nil?  
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