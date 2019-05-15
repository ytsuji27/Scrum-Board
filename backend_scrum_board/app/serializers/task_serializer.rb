class TaskSerializer < ActiveModel::Serializer

  attributes :id, :creator, :project, :assigned, :category, :content
  
end
