class RegistrationsController < ApplicationController
  
  def create
    user = User.create(user_params)
    if user.errors.empty?
      session[:user_id] = user.id
      render json: {status: :created, user: user}
    else
      render json: {
        status: :unprocessable_entity, 
        errors: user.errors.messages}
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :username, 
      :email, 
      :password, 
      :password_confirmation)
  end

end 