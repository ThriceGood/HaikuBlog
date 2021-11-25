module Types
  class QueryType < Types::BaseObject

    # all users
    field :users, [Types::UserType], null: true
    
    def users
      User.all
    end

    # user by id
    field :user, Types::UserType, null: true do
      argument :id, ID, required: true
    end
    
    def user(id:)
      User.find(id)
    end

    # all posts
    field :posts, [Types::PostType], null: true
    
    def posts
      Post.all.order(created_at: :desc)
    end

    # post by id
    field :post, Types::PostType, null: true do
      argument :id, ID, required: true
    end

    def post(id:)
      Post.find(id)
    end

    # comments by post_id
    field :comments, [Types::CommentType], null: true do
      argument :post_id, ID, required: true
    end

    def comments(post_id:)
      Comment.of_post_id(post_id).order(created_at: :desc)
    end

  end
end
