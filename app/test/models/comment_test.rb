require "test_helper"

class CommentTest < ActiveSupport::TestCase
  test "structure of reaction_info is correct" do
    # {"like":{"count":0,"user_ids":[]},"smile":{"count":0,"user_ids":[]},"thumbs_up":{"count":0,"user_ids":[]}}
    reaction_info = JSON.parse(Comment.first.reaction_info)
    assert reaction_info['like'].present?
    assert reaction_info['like']['count'].present?
    assert reaction_info['like']['user_ids'].is_a? Array
    assert reaction_info['smile'].present?
    assert reaction_info['smile']['count'].present?
    assert reaction_info['smile']['user_ids'].is_a? Array
    assert reaction_info['thumbs_up'].present?
    assert reaction_info['thumbs_up']['count'].present?
    assert reaction_info['thumbs_up']['user_ids'].is_a? Array
  end
end
