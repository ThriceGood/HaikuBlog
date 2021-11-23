class SessionsController < ApplicationController
  
  def create
    user = User.find_by(email: params[:email]).try(:authenticate, params[:password])
    unless user.nil?
      session[:user_id] = user.id
      render json: {status: :ok, user: user}
    else
      render json: {status: :unauthorized}
    end
  end

  def is_authenticated
    if @current_user
      render json: {
        status: :ok, 
        current_user: @current_user}
    else
      render json: {status: :unauthorized}
    end
  end

  def logout
    reset_session
    render json: {status: :ok}
  end

end
