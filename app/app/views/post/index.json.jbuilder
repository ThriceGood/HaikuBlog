posts = if posts then posts else @posts end
status = if status then status else :ok end
json.status status
json.posts do
  json.array! posts do |post|
    json.id post.id
    json.title post.title.titleize
    json.content post.content
    json.created_at post.created_at.strftime('%Y-%m-%d')
    json.comment_count post.comments.count
    json.user do
      json.id post.user.id
      json.username post.user.username
    end 
  end
end