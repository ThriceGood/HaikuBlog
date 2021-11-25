require "test_helper"

class ReactionChannelTest < ActionCable::Channel::TestCase
  
  test "subscribes" do
    subscribe reaction_type: 1, comment_id: 1
    assert subscription.confirmed?
    assert_has_stream 'ReactionChannel:1_1'
  end

end
