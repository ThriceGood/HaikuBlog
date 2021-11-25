require "test_helper"

class GraphqlUserTest < ActionDispatch::IntegrationTest
  
  test "user query returns expected data" do
    user = create_test_user()
    query_string = <<-GRAPHQL
      query {
        user(id:#{user.id}) {
          id
          username
          email
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(query_string)
    data = result['data']['user']
    assert data['id'] == user.id.to_s
    assert data['username'] == user.username
    assert data['email'] == user.email
  end

  test "user is created" do
    mutation_string = <<-GRAPHQL
      mutation {
        createUser(input:{
          username: "test"
          email: "test@mail.com"
          password: "password"
          passwordConfirmation: "password"
        }) {
          user {
            id
            username
            email
          }
          errors
        }
      }
    GRAPHQL
    result = HaikuBlogSchema.execute(mutation_string)
    assert 'test@mail.com' == result['data']['createUser']['user']['email']
  end

end