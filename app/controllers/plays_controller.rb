class PlaysController < ApplicationController
  include ApplicationHelper
  
  def index
    @easy_plays = filter_plays_by_difficulty(winning_plays, 'Easy')
    @medium_plays = filter_plays_by_difficulty(winning_plays, 'Medium')
    @hard_plays = filter_plays_by_difficulty(winning_plays, 'Hard')
  end 
  
  private

  def winning_plays
    Play.all.filter(&:is_win).sort_by(&:time_in_seconds)
  end  
end