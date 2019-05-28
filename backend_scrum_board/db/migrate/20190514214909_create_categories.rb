class CreateCategories < ActiveRecord::Migration[5.2]

  def change
    create_table :categories do |t|
      t.string :name
      t.references :project, foreign_key: {on_delete: :cascade}
      t.integer :taskIds, array: true, default: []
      t.timestamps
    end
  end

end
