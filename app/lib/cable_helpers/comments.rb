class CableHelpers::Comments

  def self.broadcast_comments(post_id)
    ActionCable.server.broadcast("CommentChannel:#{post_id}", 
      render_comments_json(post_id))
  end

  private

  def self.render_comments_json(post_id)
    comments = Comment.of_post_id(post_id).order(created_at: :desc)
    Jbuilder.new do |json|
      ApplicationController.render(
        template: 'comment/index.json',
        locals: { comments: comments, json: json }
      )
    end.attributes!
  end

end