require "test_helper"

class GraphqlUserTest < ActionDispatch::IntegrationTest
  
  test "comments returned for post id" do
    post = Post.first
    user = User.first
    query_string = <<-GRAPHQL
      query {
        comments(postId:#{post.id}) {
          text
          user {
            id
            username
          }
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(query_string)
    data = result['data']['comments'].first
    assert data['text'] == 'comment1'
    assert data['user']['id'] == user.id.to_s
    assert data['user']['username'] == user.username
  end

  test "comment cannot be created when not authorized" do
    user = User.first
    post = Post.first
    mutation_string = <<-GRAPHQL
      mutation {
        createComment(input:{
          text: "test comment"
          postId: #{post.id}
          userId: #{user.id}
        }) {
          errors
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(mutation_string)
    data = result['data']['createComment']['errors']
    assert data.first == 'not authorized'
  end

  test "update comment" do
    post = Post.first
    user = User.first
    comment = Comment.first
    mutation_string = <<-GRAPHQL
      mutation {
        updateComment(input:{
          id: #{comment.id}
          text: "updated comment"
        }) {
          comment {
            id
            text
            postId
            user {
              id
            }
          }
          errors
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(mutation_string, context: {current_user: user})
    data = result['data']['updateComment']['comment']
    assert data['id'] == comment.id.to_s
    assert data['text'] == 'updated comment'
    assert data['postId'] == post.id.to_s
    assert data['user']['id'] == user.id.to_s
  end

  test "comment is deleted" do
    user = User.first
    comment = Comment.first
    mutation_string = <<-GRAPHQL
      mutation {
        deleteComment(input: {
          id: #{comment.id}
        }) {
          message
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(mutation_string, context: {current_user: user})
    assert Comment.all.empty?
    assert result['data']['deleteComment']['message'] == 'successfully deleted comment'
  end

end