class Mutations::UpdateComment < Mutations::BaseMutation

  argument :id, ID, required: true
  argument :text, String, required: true

  field :comment, Types::CommentType, null: true
  field :errors, [String], null: false

  def resolve(id:, text:)
    comment = Comment.find(id)
    comment.text = text
    if comment.save
      CableHelpers::Comments.broadcast_comments(comment.post.id)
      return {
        comment: comment,
        errors: []
      }
    else
      return {
        comment: nil,
        errors: comment.errors.full_messages
      }
    end
  end

end