class CommentController < ApplicationController
  before_action :set_comment, only: [:edit, :update, :destroy]
  before_action :authorized?, except: [:index]

  # GET /post/:post_id/comment
  def index
    @comments = get_all_comments(params[:post_id])
  end

  # POST /comment
  def create
    comment = Comment.new(comment_params)
    if comment.save
      broadcast_comment(comment.post.id, :created)
      render json: {status: :created}
    else
      render json: {
        status: :unprocessable_entity, 
        errors: comment.errors.messages}
    end
  end
  
  # PATCH/PUT /comment/1
  def update
    if @comment.update(comment_params)
      broadcast_comment(@comment.post.id, :ok)
      render json: {status: :ok}
    else
      render json: {
        status: :unprocessable_entity, 
        errors: @comment.errors.messages}
    end
  end
  
  # DELETE /comment/1
  def destroy
    post_id = @comment.post.id
    if @comment.destroy
      broadcast_comment(post_id, :ok)
      render json: {status: :ok}
    else
      render json: {
        status: :unprocessable_entity, 
        errors: @comment.errors.messages}
    end
  end
  
  private
  
  def set_comment
    @comment = Comment.find(params[:id])
  end

  def get_all_comments(post_id)
    Comment.of_post_id(post_id).order(created_at: :desc)
  end

  def broadcast_comment(post_id, status)
    ActionCable.server.broadcast("CommentChannel:#{post_id}", 
      render_comments_json(post_id, status))
  end

  def render_comments_json(post_id, status)
    comments = get_all_comments(post_id)
    Jbuilder.new do |json|
      ApplicationController.render(
        template: 'comment/index.json',
        locals: { comments: comments, status: status, json: json }
      )
    end.attributes!
  end
  
  def comment_params
    params.require(:comment).permit(:text, :user_id, :post_id)
  end

end