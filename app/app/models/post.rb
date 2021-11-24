class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates_presence_of :title
  validates_presence_of :content
  
  scope :of_user, -> (user) { where(user_id: user.id) }
  scope :of_user_id, -> (user_id) { where(user_id: user_id) }
end