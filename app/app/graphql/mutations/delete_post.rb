class Mutations::DeletePost < Mutations::BaseMutation

  argument :id, ID, required: true

  field :message, String, null: false

  def resolve(id:)
    Post.find(id).destroy
    CableHelpers::Posts.broadcast_posts()
    return {
      message: 'successfully deleted post'
    }
  end

end