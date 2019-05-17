Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
      resources :projects
      resources :tasks
      get '/projecttasks/:id', to: 'tasks#projecttasks'
      resources :userproject
    end
  end
end