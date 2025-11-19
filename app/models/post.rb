class Post < ApplicationRecord
  after_create_commit -> { 
    broadcast_prepend_to :posts_after_create_stream,
      target: :posts_element,
      partial: "posts/post",
      locals: { post: self }
  }

  after_create_commit -> { 
    broadcast_prepend_to :posts_after_create_stream,
      target: :posts_element,
      partial: "simpler/post",
      locals: { post: self }
  }

end
