class PostChannel < ApplicationCable::Channel
  
  def subscribed
    stream_from "PostChannel"
  end

  def unsubscribed
  end

end
