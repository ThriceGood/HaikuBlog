class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  has_many :reactions, dependent: :destroy

  validates_presence_of :text

  scope :of_post, -> (post) { where(post_id: post.id) }
  scope :of_post_id, -> (post_id) { where(post_id: post_id) }

end