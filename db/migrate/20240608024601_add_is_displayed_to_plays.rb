class AddIsDisplayedToPlays < ActiveRecord::Migration[7.0]
  def change
    add_column :plays, :is_displayed, :boolean, :default => false
  end
end
