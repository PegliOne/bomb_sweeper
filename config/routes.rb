Rails.application.routes.draw do
  root to: "pages#home"
  get "game/:difficulty", to: "pages#home", as: "game"

  get "/log_in", to: "sessions#new"
  post "/log_in", to: "sessions#create"
  delete "/log_out", to: "sessions#destroy"

  get "/sign_up", to: "users#new"
  post "/sign_up", to: "users#create"

  get "/profile", to: "users#show", as: "user"
  delete "/profiles/:id", to: "users#destroy", as: "user_destroy"

  get "/scoreboard", to: "plays#index", as: "plays"

  post "/plays/:difficulty/:is_win/:time_in_seconds", to: "plays#create"

  match '*unmatched', to: 'pages#not_found', via: :all
end
