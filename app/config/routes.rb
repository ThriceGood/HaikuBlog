Rails.application.routes.draw do
  
  root 'index#index'
  
  resources :sessions, only: [:create]
  get :authenticate, to: "sessions#is_authenticated"
  delete :logout, to: "sessions#logout"  
  resources :registrations, only: [:create]
  
  post "/graphql", to: "graphql#execute"

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: 'graphql#execute'
  end

  mount ActionCable.server => '/cable'
end
