class Mutations::CreateComment < Mutations::BaseMutation

  argument :text, String, required: true
  argument :post_id, ID, required: true
  argument :user_id, ID, required: true

  field :comment, Types::CommentType, null: true
  field :errors, [String], null: false

  def resolve(text:, post_id:, user_id:)
    if is_authorized?
      comment = Comment.new(text: text, post_id: post_id, user_id: user_id)
      if comment.save
        CableHelpers::Comments.broadcast_comments(post_id)
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
    else
      return {
        errors: ['not authorized']
      }
    end
  end

end