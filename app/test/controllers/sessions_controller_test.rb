require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  
  test "wrong login details causes response with unauthorized" do
    post sessions_url, params: {email: 'abc@mail.com', password: '123'}
    assert json_status(body) == 'unauthorized'
  end

  test "correct login details causes ok response" do
    user = create_test_user()
    post sessions_url, params: {email: user.email, password: user.password}
    assert json_status(body) == 'ok'
  end

  test "correct login details returns correct user" do
    user = create_test_user()
    post sessions_url, params: {email: user.email, password: user.password}
    assert JSON.parse(body)['user']['id'] == user.id
  end

  test "authentication check reponds with ok if authenticated" do
    user = create_test_user()
    post sessions_url, params: {email: user.email, password: user.password}
    get authenticate_url 
    assert json_status(body) == 'ok'
  end

  test "authentication check reponds with correct user if authenticated" do
    user = create_test_user()
    post sessions_url, params: {email: user.email, password: user.password}
    get authenticate_url 
    assert JSON.parse(body)['current_user']['id'] == user.id
  end

  test "authentication check reponds with unauthorized if not authenticated" do
    post sessions_url, params: {email: 'abc@mail.com', password: '123'}
    get authenticate_url 
    assert json_status(body) == 'unauthorized'
  end

  test "successful logout returns ok" do
    user = create_test_user()
    post sessions_url, params: {email: user.email, password: user.password}
    delete logout_url 
    assert json_status(body) == 'ok'
  end

  test "successful logout deletes session" do
    user = create_test_user()
    post sessions_url, params: {email: user.email, password: user.password}
    delete logout_url
    get authenticate_url
    assert json_status(body) == 'unauthorized'
  end

end