class Mutations::DeleteComment < Mutations::BaseMutation

  argument :id, ID, required: true

  field :message, String, null: false

  def resolve(id:)
    if is_authorized?
      comment = Comment.find(id)
      post_id = comment.post.id
      comment.destroy
      CableHelpers::Comments.broadcast_comments(post_id)
      return {
        message: 'successfully deleted comment'
      }
    else
      return {
        errors: ['not authorized']
      }
    end
  end

end