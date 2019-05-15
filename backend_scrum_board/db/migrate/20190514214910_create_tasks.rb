class CreateTasks < ActiveRecord::Migration[5.2]

  def change
    create_table :tasks do |t|
      t.belongs_to :user, foreign_key: true
      t.references :project, foreign_key: true
      t.references :assigned, index: true
      t.string :category
      t.text :content
      t.timestamps
    end
  end
  
end
