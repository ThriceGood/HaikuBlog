class ApplicationController < ActionController::Base
  before_action :set_current_user
  
  def set_current_user
    if session[:user_id]
      @current_user = User.find(session[:user_id])
    end
  end

  def authorized?
    unless @current_user
      render json: {status: :unauthorized}
    end
  end

end
