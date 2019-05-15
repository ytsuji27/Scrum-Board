class Task < ApplicationRecord

  belongs_to :user
  belongs_to :assigned, class_name: "User", foreign_key: "assigned_id"

end
