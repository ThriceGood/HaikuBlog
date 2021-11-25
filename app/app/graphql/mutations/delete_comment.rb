class Mutations::DeleteComment < Mutations::BaseMutation

  argument :id, ID, required: true

  field :message, String, null: false

  def resolve(id:)
    comment = Comment.find(id)
    post_id = comment.post.id
    comment.destroy
    CableHelpers::Comments.broadcast_comments(post_id)
    return {
      message: 'successfully deleted comment'
    }
  end

end