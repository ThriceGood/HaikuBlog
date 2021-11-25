module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    def is_authorized?
      if context[:current_user].nil?
        return false
      else
        return true
      end
    end

  end
end
