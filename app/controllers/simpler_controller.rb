class SimplerController < ApplicationController
  
  def index
    @pagy, @posts = pagy(Post.order(created_at: :desc), items: 10)
    
    if turbo_frame_request?
      render partial: "simpler/posts_frame", locals: { post_view_models: @posts, pagy: @pagy }
    end

  end

  def destroy_multiple
    # debugger

    Post.where(id: params[:ids]).destroy_all
    redirect_to simpler_index_path, notice: "Deleted"
  end

end
