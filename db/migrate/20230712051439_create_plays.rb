class CreatePlays < ActiveRecord::Migration[7.0]
  def change
    create_table :plays do |t|
      t.string :difficulty
      t.boolean :is_win
      t.integer :time_in_seconds

      t.timestamps
    end
  end
end
