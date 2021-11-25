class Mutations::DeletePost < Mutations::BaseMutation

  argument :id, ID, required: true

  field :message, String, null: true
  field :errors, [String], null: true

  def resolve(id:)
    if is_authorized?
      Post.find(id).destroy
      CableHelpers::Posts.broadcast_posts()
      return {
        message: 'successfully deleted post',
      }
    else
      return {
        errors: ['not authorized']
      }
    end
  end

end