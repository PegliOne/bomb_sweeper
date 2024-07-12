class RenameIsDisplayToIsPubliclyDisplayed < ActiveRecord::Migration[7.0]
  def change
    rename_column :plays, :is_displayed, :is_publicly_displayed
  end
end
