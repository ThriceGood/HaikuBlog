class Reaction < ApplicationRecord
  belongs_to :comment
  belongs_to :user

  enum reaction_type: [:like, :smile, :thumbs_up]

  scope :of_type, -> (reaction_type) { where(reaction_type: reaction_type) }
  scope :of_user, -> (user) { where(user_id: user.id) }
  scope :of_user_id, -> (user_id) { where(user_id: user_id) }
  scope :of_comment, -> (comment) { where(comment_id: comment.id) }
  scope :of_comment_id, -> (comment_id) { where(comment_id: comment_id) }
end