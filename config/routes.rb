Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  resources :posts do
    delete '/', action: :destroy_multiple, on: :collection
  end

  # resources :posts

  root "posts#index"
end
