module Types
  class PostType < Types::BaseObject
    
    field :id, ID, null: false
    field :title, String, null: true
    field :content, String, null: true
    field :user, Types::UserType, null: false
    field :comments, [Types::CommentType], null: true
    field :comment_count, Integer, null: true, 
      description: 'count of associated comments'
    field :created_at, String, null: false
    
    def comment_count
      object.comments.count
    end

    def created_at
      object.created_at.strftime('%Y-%m-%d')
    end
    
  end
end