json.status :ok
json.posts do
  json.array! posts do |post|
    json.id post.id
    json.title post.title.titleize
    json.content post.content
    json.createdAt post.created_at.strftime('%Y-%m-%d')
    json.commentCount post.comments.count
    json.user do
      json.id post.user.id
      json.username post.user.username
    end 
  end
end