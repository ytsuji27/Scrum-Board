class CreateProjects < ActiveRecord::Migration[5.2]

  def change
    create_table :projects do |t|
      t.string :name
      t.text :description
      t.references :user, foreign_key: {on_delete: :cascade}
      t.timestamps
    end
  end
  
end
