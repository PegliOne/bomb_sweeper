module ApplicationHelper
  def convert_time(time)
    time.localtime.strftime("%-l:%M:%S%P %d/%m/%Y")
  end  

  def convert_time_to_date(time)
    time.localtime.strftime("%d/%m/%Y")
  end  

  def filter_plays_by_difficulty(plays, difficulty)
    plays.filter{|play| play.difficulty == difficulty}
  end  
end
