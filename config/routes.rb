Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  resources :simpler do
    delete '/', action: :destroy_multiple, on: :collection
  end

  resources :posts

  root "simpler#index"
end
