class Mutations::UpdatePost < Mutations::BaseMutation

  argument :id, ID, required: true
  argument :title, String, required: true
  argument :content, String, required: true

  field :post, Types::PostType, null: true
  field :errors, [String], null: false

  def resolve(id:, title:, content:)
    post = Post.find(id)
    post.title = title
    post.content = content
    if post.save
      CableHelpers::Posts.broadcast_posts()
      return {
        post: post,
        errors: []
      }
    else
      return {
        post: nil,
        errors: post.errors.full_messages
      }
    end
  end

end