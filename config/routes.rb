Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  resources :simpler

  resources :posts
  root "simpler#index"
end
