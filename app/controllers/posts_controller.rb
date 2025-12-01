class PostsController < ApplicationController
  
  def index
    @pagy, @posts = pagy(Post.order(created_at: :desc), items: 10)
    
    if turbo_frame_request?
      render partial: "posts/posts_frame", locals: { post_view_models: @posts, pagy: @pagy }
    end

  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to root_path, format: :html
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy_multiple
    @deleted_ids = Array(params[:ids])
    Post.where(id: params[:ids]).destroy_all

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to posts_path, notice: "Deleted" }
    end

  end

  private

  def post_params
    params.expect(post: [ :title, :body ])
  end
end
