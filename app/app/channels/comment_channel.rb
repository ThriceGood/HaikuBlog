class CommentChannel < ApplicationCable::Channel
  
  def subscribed
    stream_from "CommentChannel:#{params[:post_id]}"
  end

  def unsubscribed
  end
  
end
