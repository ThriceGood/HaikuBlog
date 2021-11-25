class Mutations::CreatePost < Mutations::BaseMutation

  argument :title, String, required: true
  argument :content, String, required: true
  argument :user_id, ID, required: true

  field :post, Types::PostType, null: true
  field :errors, [String], null: true

  def resolve(title:, content:, user_id:)
    if is_authorized?
      post = Post.new(title: title, content: content, user_id: user_id)
      if post.save
        CableHelpers::Posts.broadcast_posts()
        return {
          post: post,
        }
      else
        return {
          errors: post.errors.full_messages
        }
      end
    else
      return {
        errors: ['not authorized']
      }
    end
  end

end