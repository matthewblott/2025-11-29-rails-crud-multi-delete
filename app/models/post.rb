class Post < ApplicationRecord
  # After a Post is created the contents of the partial view "posts/_post.html.erb"
  # are appended to the html element with the id of "posts_element" of any page wherever a 
  # stream named "posts_after_create_stream" is rendered.
  after_create_commit -> { 
    broadcast_prepend_to :posts_after_create_stream,
      target: :posts_element,
      partial: "posts/post",
      locals: { post: self }
  }
end
