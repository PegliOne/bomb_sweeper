class PlaysController < ApplicationController
  def index
    @plays = Play.all.sort_by(&:time_in_seconds)
  end  
end