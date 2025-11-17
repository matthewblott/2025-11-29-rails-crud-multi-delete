class Post < ApplicationRecord
  # after_create_commit -> { 
  #   broadcast_prepend_to "posts",
  #                       target: "posts",
  #                       partial: "posts6/post",
  #                       locals: { post: self }
  # }

end
