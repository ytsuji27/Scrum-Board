class TaskSerializer < ActiveModel::Serializer

  attributes :id, :user, :project, :assigned, :category, :content
  
end
