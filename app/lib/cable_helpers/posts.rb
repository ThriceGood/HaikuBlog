class CableHelpers::Posts

  def self.broadcast_posts()
    ActionCable.server.broadcast("PostChannel", 
      render_posts_json())
  end

  private

  def self.render_posts_json
    posts = Post.all.order(created_at: :desc)
    Jbuilder.new do |json|
      ApplicationController.render(
        template: 'post/index',
        locals: { posts: posts, json: json }
      )
    end.attributes!
  end

end