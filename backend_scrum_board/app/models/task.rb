class Task < ApplicationRecord

  belongs_to :user, optional: true
  belongs_to :category
  belongs_to :assigned, class_name: "User", foreign_key: "assigned_id", optional: true

end
