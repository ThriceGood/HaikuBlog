module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :username, String, null: true
    field :email, String, null: true
    field :posts, [Types::PostType], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
