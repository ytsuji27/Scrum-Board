class CreateUserProjects < ActiveRecord::Migration[5.2]

  def change
    create_table :user_projects do |t|
      t.references :user, foreign_key: {on_delete: :cascade}
      t.references :project, foreign_key: {on_delete: :cascade}
      t.timestamps
    end
  end
  
end
