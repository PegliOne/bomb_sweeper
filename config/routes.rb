Rails.application.routes.draw do
  root to: 'pages#home'

  get '/log_in', to: 'sessions#new'
  get '/sign_out', to: 'sessions#destroy'

  get '/sign_up', to: 'users#new'
  get '/scoreboard', to: 'users#index', as: 'users'
  get '/profiles/:id', to: 'users#show', as: 'user'
  delete '/profiles/:id', to: 'users#destroy', as: 'user_destroy'
end
