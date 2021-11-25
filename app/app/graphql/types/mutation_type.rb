module Types
  class MutationType < Types::BaseObject
    # post mutations
    field :create_post, mutation: Mutations::CreatePost
    field :update_post, mutation: Mutations::UpdatePost
    field :delete_post, mutation: Mutations::DeletePost
    # user mutations
    field :create_user, mutation: Mutations::CreateUser
    # comment mutations
    field :create_comment, mutation: Mutations::CreateComment
    field :update_comment, mutation: Mutations::UpdateComment
    field :delete_comment, mutation: Mutations::DeleteComment
  end
end
