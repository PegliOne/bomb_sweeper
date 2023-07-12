# Remove these later

# Rows
User.destroy_all
u1 = User.create :username => "PegliOne", :email => 'pamela@gmail.com', :password => "chicken"
u2 = User.create :username => "BFG9K", :email => "jackson@gmail.com", :password => "chicken"
puts "#{ User.count } users."

Play.destroy_all
p1 = Play.create :difficulty => "Easy", :is_win => true, :time_in_seconds => 120
p2 = Play.create :difficulty => "Medium", :is_win => false, :time_in_seconds => 300
puts "#{ Play.count } plays"

# Associations
puts "Users and plays."
u1.plays << p2
u2.plays << p1