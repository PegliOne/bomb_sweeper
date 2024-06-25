module ApplicationHelper
  def convert_time(time)
    time.localtime.strftime("%-l:%M:%S%P %d/%m/%Y")
  end  

  def convert_time_to_date(time)
    time.localtime.strftime("%d/%m/%Y")
  end  

  def filter_plays_by_difficulty(plays, difficulty)
    plays.filter{|play| play.difficulty.downcase == difficulty}
  end  

  def get_displayed_plays(plays)
    plays.filter{ |play| play.is_win && play.is_displayed }
  end

  def select_displayed_plays(plays)
    plays.sort_by(&:time_in_seconds).take(10)
  end
end
