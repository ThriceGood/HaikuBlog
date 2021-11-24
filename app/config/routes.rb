Rails.application.routes.draw do
  
  root 'index#index'
  
  resources :sessions, only: [:create]
  get :authenticate, to: "sessions#is_authenticated"
  delete :logout, to: "sessions#logout"
  
  resources :registrations, only: [:create]
  
  resources :post, only: [:index, :show, :create, :update, :destroy], :defaults => { :format => 'json' } do
    resources :comment, only: [:index]
  end 
  resources :comment, only: [:create, :update, :destroy], :defaults => { :format => 'json' } 

  resources :user, only: [], :defaults => { :format => 'json' } do 
    resources :post, only: [:index]
  end

  resources :reaction, only: [:create, :destroy], :defaults => { :format => 'json' } 
  get 'reaction/:comment_id/:reaction_type', to: 'reaction#get_reactions_by_type'

  mount ActionCable.server => '/cable'
end
