class CreateTasks < ActiveRecord::Migration[5.2]

  def change
    create_table :tasks do |t|
      t.belongs_to :user, foreign_key: {on_delete: :cascade}
      t.references :project, foreign_key: {on_delete: :cascade}
      t.references :category, foreign_key: {on_delete: :cascade}
      t.references :assigned, index: true
      t.text :content
      t.timestamps
    end
  end
  
end
