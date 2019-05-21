class UserprojectSerializer < ActiveModel::Serializer

  belongs_to :user
  belongs_to :project
  attributes :id, :user, :project

end
