class ProjectSerializer < ActiveModel::Serializer

  belongs_to :user
  attributes :id, :name, :description, :user, :columnOrder

end

