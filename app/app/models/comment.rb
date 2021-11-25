class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  has_many :reactions, dependent: :destroy

  validates_presence_of :text

  scope :of_post, -> (post) { where(post_id: post.id) }
  scope :of_post_id, -> (post_id) { where(post_id: post_id) }

  def reaction_info
    # returning json for use in graphQL type
    return {
      like: {
        count: Reaction.of_comment(self).of_type('like').count,
        user_ids: Reaction.of_comment(self).of_type('like').map{|reaction| reaction.user.id}
      },
      smile: {
        count: Reaction.of_comment(self).of_type('smile').count,
        user_ids: Reaction.of_comment(self).of_type('smile').map{|reaction| reaction.user.id}
      },
      thumbs_up: {
        count: Reaction.of_comment(self).of_type('thumbs_up').count,
        user_ids: Reaction.of_comment(self).of_type('thumbs_up').map{|reaction| reaction.user.id}
      }
    }.to_json
  end

end