# Remove these later

# Rows
User.destroy_all
u1 = User.create :username => "PegliOne", :email => "pamela@gmail.com", :password => "chicken"
u2 = User.create :username => "BFG9K", :email => "jackson@gmail.com", :password => "chicken"
puts "#{ User.count } users."

Play.destroy_all
p1 = Play.create :difficulty => "easy", :is_win => true, :time_in_seconds => 20
p2 = Play.create :difficulty => "easy", :is_win => true, :time_in_seconds => 30
p3 = Play.create :difficulty => "medium", :is_win => false, :time_in_seconds => 90
p4 = Play.create :difficulty => "medium", :is_win => true, :time_in_seconds => 105
p5 = Play.create :difficulty => "medium", :is_win => true, :time_in_seconds => 120
p6 = Play.create :difficulty => "hard", :is_win => true, :time_in_seconds => 420
p7 = Play.create :difficulty => "hard", :is_win => true, :time_in_seconds => 480
puts "#{ Play.count } plays"

# Associations
puts "Users and plays."
u1.plays << p2 << p3 << p4 << p7
u2.plays << p1 << p5 << p6