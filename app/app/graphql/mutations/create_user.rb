class Mutations::CreateUser < Mutations::BaseMutation

  argument :username, String, required: true
  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :user, Types::UserType, null: true
  field :errors, [String], null: true

  def resolve(username:, email:, password:, password_confirmation:)
    user = User.new(
      username: username, 
      email: email, 
      password: password, 
      password_confirmation: password_confirmation)
    if user.save
      return {
        user: user
      }
    else
      return {
        errors: user.errors.full_messages
      }
    end
  end

end