# Create 100 posts
100.times.with_index do |i|
    Post.create(
        title: Faker::Lorem.sentence(word_count: 3),
        body: Faker::Lorem.paragraph(sentence_count: 3),
    )
    puts "Created post #{i + 1}"
end

