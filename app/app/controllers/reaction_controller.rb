class ReactionController < ApplicationController
  before_action :set_reaction, only: [:edit, :update, :destroy]
  before_action :set_comment, only: [:get_reactions_by_type]
  before_action :authorized?, except: [:get_reactions_by_type]

  # GET /reaction/:comment_id/:reaction_type
  # def get_reactions_by_type
  #   reactions = Reaction
  #     .of_type(params[:reaction_type])
  #     .of_comment(@comment)
  #   render json: {status: :ok, reactions: reactions}
  # end

  # POST /reaction
  # def create
  #   reaction = Reaction.new(reaction_params)
  #   if reaction.save
  #     reactions = Reaction
  #       .of_comment(reaction.comment)
  #       .where(reaction_type: reaction.reaction_type)
  #     broadcast_reaction_count(reaction)
  #     render json: {
  #     status: :created, 
  #     reactions: reactions}
  #   else
  #     render json: {
  #       status: :unprocessable_entity, 
  #       errors: reaction.errors.messages}
  #   end
  # end
  
  # DELETE /reaction/1
  # def destroy
  #   if @reaction.destroy
  #     broadcast_reaction_count(@reaction)
  #     render json: {status: :ok}
  #   else
  #     render json: {
  #       status: :unprocessable_entity, 
  #       errors: @reaction.errors.messages}
  #   end
  # end
  
  private
  
  def set_reaction
    @reaction = Reaction.find(params[:id])
  end

  def set_comment
    @comment = Comment.find(params[:comment_id])
  end
  
  def broadcast_reaction_count(reaction)
    ActionCable.server.broadcast(
      "ReactionChannel:#{reaction.reaction_type}_#{reaction.comment.id}", 
      reaction.comment.reactions.of_type(reaction.reaction_type).count)
  end

  def reaction_params
    params.require(:reaction).permit(:reaction_type, :user_id, :comment_id)
  end

end
