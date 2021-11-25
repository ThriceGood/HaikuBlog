comments = if comments then comments else @comments end
status = if status then status else :ok end
json.status status
json.comments do
  json.array! comments do |comment|
    json.id comment.id
    json.postId comment.post.id
    json.text comment.text
    json.user do 
      json.id comment.user.id
      json.username comment.user.username
    end
    json.reactionInfo comment.reaction_info
    json.createdAt comment.created_at.strftime('%Y-%m-%d %H:%M')
  end
end