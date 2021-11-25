ENV['RAILS_ENV'] ||= 'test'
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  def json_status(body)
    return JSON.parse(body)['status']
  end

  def create_test_user
    return User.create({
      username: 'test', 
      email: 'test@mail.com', 
      password: 'test', 
      password_confirmation: 'test'})
  end

end
