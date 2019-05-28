class CategorySerializer < ActiveModel::Serializer

  belongs_to :project
  has_many :tasks
  attributes :id, :name, :taskIds

end
