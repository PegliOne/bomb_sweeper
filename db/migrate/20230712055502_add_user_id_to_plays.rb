class AddUserIdToPlays < ActiveRecord::Migration[7.0]
  def change
    add_column :plays, :user_id, :integer
  end
end
