module Types
  class CommentType < Types::BaseObject
    
    field :id, ID, null: false
    field :post_id, ID, null: false
    field :text, String, null: false
    field :user, Types::UserType, null: false
    field :reaction_info, String, null: true, 
      description: 'information about associated reactions'
    field :created_at, String, null: false
    
    def reaction_info
      object.reaction_info
    end

    def created_at
      object.created_at.strftime('%Y-%m-%d %H:%M')
    end
    
  end
end