class Mutations::CreatePost < Mutations::BaseMutation

  argument :title, String, required: true
  argument :content, String, required: true
  argument :user_id, ID, required: true

  field :post, Types::PostType, null: true
  field :errors, [String], null: false

  def resolve(title:, content:, user_id:)
    post = Post.new(title: title, content: content, user_id: user_id)
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