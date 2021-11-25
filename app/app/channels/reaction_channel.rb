class ReactionChannel < ApplicationCable::Channel
  
  def subscribed
    comment_id = params[:comment_id]
    reaction_type = params[:reaction_type]
    stream_from "ReactionChannel:#{reaction_type}_#{comment_id}"
  end

  def unsubscribed
  end

  # handles creation and deletion of reactions for user
  # broadcasts reaction data update to connect users
  def receive(data)
    commit = data['commit']
    user_id = data['user_id']
    comment_id = data['comment_id']
    reaction_type = data['reaction_type']
    if commit == 'create'
      reaction = Reaction.create(
        comment_id: comment_id,
        user_id: user_id,
        reaction_type: reaction_type
      )
      reaction_data = get_reaction_data(comment_id, reaction_type)
      broadcast_reaction_data(comment_id, reaction_type, reaction_data)
    elsif commit == 'delete'
      Reaction.of_user_id(user_id).of_comment_id(comment_id).of_type(reaction_type).first.delete
      reaction_data = get_reaction_data(comment_id, reaction_type)
      broadcast_reaction_data(comment_id, reaction_type, reaction_data)
    end
  end

  # generates the reaction data hash required by frontend
  def get_reaction_data(comment_id, reaction_type)
    comment = Comment.find(comment_id)
    user_ids = Reaction
      .of_comment(comment)
      .of_type(reaction_type)
      .map{|reaction| reaction.user.id}
    reaction_data = {
      count: comment.reactions.of_type(reaction_type).count,
      user_ids: user_ids
    }
    return reaction_data
  end

  def broadcast_reaction_data(comment_id, reaction_type, reaction_data)
    ActionCable.server.broadcast("ReactionChannel:#{reaction_type}_#{comment_id}", reaction_data)
  end

end
