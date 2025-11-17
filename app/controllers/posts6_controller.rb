class Posts6Controller < ApplicationController
  include Pagy::Backend
  
  # def index
  #   @pagy, @posts = pagy(Post.order(created_at: :desc), items: 20)
  # end
  def index
    @pagy, @posts = pagy(Post.order(created_at: :desc), items: 20)
    
    # Respond to turbo frame requests with just the posts
    if turbo_frame_request?
      render partial: "posts6/posts_frame", locals: { posts: @posts, pagy: @pagy }
    end
  end

end
