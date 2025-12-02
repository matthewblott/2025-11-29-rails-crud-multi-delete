Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  resources :posts do
    delete '/', action: :destroy_multiple, on: :collection
  end

  root "posts#index"
end
