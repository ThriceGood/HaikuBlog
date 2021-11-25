class Mutations::UpdatePost < Mutations::BaseMutation

  argument :id, ID, required: true
  argument :title, String, required: true
  argument :content, String, required: true

  field :post, Types::PostType, null: true
  field :errors, [String], null: true

  def resolve(id:, title:, content:)
    if is_authorized?
      post = Post.find(id)
      post.title = title
      post.content = content
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