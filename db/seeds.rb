# Remove these later

# Rows
User.destroy_all
u1 = User.create :username => "PegliOne", :email => 'pamela@gmail.com', :password => "chicken"
u2 = User.create :username => "BFG9K", :email => "jackson@gmail.com", :password => "chicken"
puts "#{ User.count } users."

Play.destroy_all
p1 = Play.create :difficulty => "Easy", :is_win => true, :time_in_seconds => 120
p2 = Play.create :difficulty => "Easy", :is_win => true, :time_in_seconds => 140
p3 = Play.create :difficulty => "Medium", :is_win => false, :time_in_seconds => 300
p4 = Play.create :difficulty => "Medium", :is_win => true, :time_in_seconds => 400
p5 = Play.create :difficulty => "Medium", :is_win => true, :time_in_seconds => 300
p6 = Play.create :difficulty => "Hard", :is_win => true, :time_in_seconds => 500
p7 = Play.create :difficulty => "Hard", :is_win => true, :time_in_seconds => 550
puts "#{ Play.count } plays"

# Associations
puts "Users and plays."
u1.plays << p2 << p3 << p4 << p7
u2.plays << p1 << p5 << p6