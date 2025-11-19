class PostsController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]
  
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
      redirect_to @post, notice: "Post was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      redirect_to @post, notice: "Post was successfully updated.", status: :see_other
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy!
    redirect_to posts_path, notice: "Post was successfully destroyed.", status: :see_other
  end

  private
    def set_post
      @post = Post.find(params.expect(:id))
    end

    def post_params
      params.expect(post: [ :title, :body ])
    end
end
