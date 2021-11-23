comments = if comments then comments else @comments end
status = if status then status else :ok end
json.status status
json.comments do
  json.array! comments do |comment|
    json.id comment.id
    json.post_id comment.post.id
    json.text comment.text
    json.user do 
      json.id comment.user.id
      json.username comment.user.username
    end
    json.reactions do
      json.like do
        json.count Reaction.of_comment(comment).of_type('like').count
        json.user_ids Reaction.of_comment(comment).of_type('like').map{|reaction| reaction.user.id}
      end
      json.smile do
        json.count Reaction.of_comment(comment).of_type('smile').count
        json.user_ids Reaction.of_comment(comment).of_type('smile').map{|reaction| reaction.user.id}
      end
      json.thumbs_up do
        json.count Reaction.of_comment(comment).of_type('thumbs_up').count
        json.user_ids Reaction.of_comment(comment).of_type('thumbs_up').map{|reaction| reaction.user.id}
      end
    end
    json.created_at comment.created_at.strftime('%Y-%m-%d %H:%M')
  end
end