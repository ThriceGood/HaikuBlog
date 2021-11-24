json.status :ok
json.post do
  json.id @post.id
  json.title @post.title.titleize
  json.content @post.content
  json.created_at @post.created_at.strftime('%Y-%m-%d')
  json.user do
    json.id @post.user.id
    json.username @post.user.username
  end 
end