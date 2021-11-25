require "test_helper"

class CommentChannelTest < ActionCable::Channel::TestCase
  
  test "subscribes" do
    subscribe post_id: 1
    assert subscription.confirmed?
    assert_has_stream 'CommentChannel:1'
  end
  
end
