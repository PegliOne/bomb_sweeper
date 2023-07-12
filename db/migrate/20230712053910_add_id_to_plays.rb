class AddIdToPlayss < ActiveRecord::Migration[7.0]
  def change
    add_column :plays, :play_id, :integer
  end
end
