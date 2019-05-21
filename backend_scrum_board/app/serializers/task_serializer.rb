class TaskSerializer < ActiveModel::Serializer

  belongs_to :user
  belongs_to :assigned, class_name: "User", foreign_key: "assigned_id", optional: true
  attributes :id, :user_id, :project_id, :assigned_id, :category, :content
  
end
