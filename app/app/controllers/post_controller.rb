class PostController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :authorized?, except: [:index, :show]

  # GET /post
  def index
    @posts = get_all_posts(params[:user_id])
  end
  
  # GET /post/1
  def show
  end
  
  # POST /post
  def create
    post = Post.new(post_params)
    if post.save
      broadcast_post(:created)
      render json: {status: :created, post: post}
    else
      render json: {
        status: :unprocessable_entity, 
        errors: post.errors.messages}
    end
  end
  
  # PATCH/PUT /post/1
  def update
    if @post.update(post_params)
      broadcast_post(:ok)
      render json: {status: :ok, post: @post}
    else
      render json: {
        status: :unprocessable_entity, 
        errors: @post.errors.messages}
    end
  end
  
  # DELETE /post/1
  def destroy
    if @post.destroy
      broadcast_post(:ok)
      render json: {status: :ok}
    else
      render json: {
        status: :unprocessable_entity, 
        errors: @post.errors.messages}
    end
  end
  
  private
  
  def set_post
    @post = Post.find(params[:id])
  end

  def get_all_posts(user_id=nil)
    if user_id.nil?
      Post.all.order(created_at: :desc)
    else
      Post.of_user_id(user_id).order(created_at: :desc)
    end
  end

  def broadcast_post(status)
    ActionCable.server.broadcast("PostChannel", 
      render_posts_json(status))
  end

  def render_posts_json(status)
    posts = get_all_posts()
    Jbuilder.new do |json|
      ApplicationController.render(
        template: 'post/index.json',
        locals: { posts: posts, status: status, json: json }
      )
    end.attributes!
  end
  
  def post_params
    params.require(:post).permit(:title, :content, :user_id)
  end

end
