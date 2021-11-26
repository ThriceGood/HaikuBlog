require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  
  test "user is created" do
    post registrations_url, params: {
      user: {
          username: 'test',
          email: 'test@mail.com', 
          password: 'password',
          password_confirmation: 'password'
      }
    }
    assert json_status(body) == 'created'
    assert JSON.parse(body)['user']['email'] == 'test@mail.com'
  end

  test "user must have unique email" do
    create_test_user()
    post registrations_url, params: {
      user: {
          username: 'test',
          email: 'test@mail.com', 
          password: 'password',
          password_confirmation: 'password'
      }
    }
    assert json_status(body) == 'unprocessable_entity'
    assert JSON.parse(body)['errors']['email'].first == 'has already been taken'
  end

  test "password confirmation must match password" do
    post registrations_url, params: {
      user: {
          username: 'test',
          email: 'test@mail.com', 
          password: 'password',
          password_confirmation: 'password123'
      }
    }
    assert json_status(body) == 'unprocessable_entity'
    assert JSON.parse(body)['errors']['password_confirmation'].first == "doesn't match Password"
  end

  test "user is logged in after registration" do
    post registrations_url, params: {
      user: {
          username: 'test',
          email: 'test@mail.com', 
          password: 'password',
          password_confirmation: 'password'
      }
    }
    assert json_status(body) == 'created'
    get authenticate_url 
    assert json_status(body) == 'ok'
  end

end