Rails.application.routes.draw do
  resources :posts
  resources :posts2
  resources :posts3
  resources :posts4
  resources :posts5
  resources :posts6
  root "posts6#index"
end
