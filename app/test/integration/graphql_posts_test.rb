require "test_helper"

class GraphqlUserTest < ActionDispatch::IntegrationTest
  
  test "post query returns expected data" do
    post = Post.first
    query_string = <<-GRAPHQL
      query {
        post(id:#{post.id}) {
          id
          title
          content
          createdAt
          commentCount
          user {
            id
            username
          }
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(query_string)
    data = result['data']['post']
    assert data['id'] == post.id.to_s
    assert data['title'] == post.title
    assert data['content'] == post.content
    assert data['createdAt'] == post.created_at.strftime('%Y-%m-%d')
    assert data['commentCount'] == post.comments.count
    assert data['user']['id'] == post.user.id.to_s
    assert data['user']['username'] == post.user.username
  end

  test "post query returns associated comments" do
    post = Post.first
    query_string = <<-GRAPHQL
      query {
        post(id:#{post.id}) {
          comments {
            text
            user {
              username
            }
          }
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(query_string)
    data = result['data']['post']['comments'].first
    assert data['text'] == 'comment1'
    assert data['user']['username'] == 'testuser'
  end

  test "post cannot be created when not authorized" do
    user = User.first
    mutation_string = <<-GRAPHQL
      mutation {
        createPost(input:{
          title: "test post"
          content: "test post content"
          userId: #{user.id}
        }) {
          post {
            id
            title
            content
            user {
              id
              username
            }
          }
          errors
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(mutation_string)
    data = result['data']['createPost']['errors']
    assert data.first == 'not authorized'
  end

  test "update post" do
    user = User.first
    post = Post.last
    mutation_string = <<-GRAPHQL
      mutation {
        updatePost(input:{
          id: #{post.id}
          title: "updated title"
          content: "updated content"
        }) {
          post {
            id
            title
            content
          }
          errors
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(mutation_string, context: {current_user: user})
    data = result['data']['updatePost']['post']
    assert data['id'] == post.id.to_s
    assert data['title'] == 'updated title'
    assert data['content'] == 'updated content'
  end

  test "post fails to created with missing field (content)" do
    user = create_test_user()
    mutation_string = <<-GRAPHQL
      mutation {
        createPost(input:{
          title: "new post"
          userId: #{user.id}
        }) {
          post {
            id
            title
            content
          }
          errors
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(mutation_string, context: {current_user: user})
    assert result['errors'].first['message'] == "Argument 'content' on InputObject 'CreatePostInput' is required. Expected type String!"
  end

  test "rails model errors are returned on failed validation" do
    user = User.last
    mutation_string = <<-GRAPHQL
      mutation {
        createPost(input:{
          title: "post1"
          content: "post1"
          userId: #{user.id}
        }) {
          post {
            id
            title
            content
          }
          errors
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(mutation_string, context: {current_user: user})
    data = result['data']['createPost']
    assert data['post'] == nil
    assert data['errors'].first == "Title has already been taken"
  end

  test "post is deleted" do
    post = Post.last
    user = User.last
    mutation_string = <<-GRAPHQL
      mutation {
        deletePost(input: {
          id: #{post.id}
        }) {
          message
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(mutation_string, context: {current_user: user})
    assert result['data']['deletePost']['message'] == 'successfully deleted post'
  end

end