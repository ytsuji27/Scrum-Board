class User < ApplicationRecord

    has_secure_password
    has_many :tasks
    validates :username, uniqueness: { case_sensitive: false }
    
end
