docker exec haiku-blog_app_1 rails db:create
docker exec haiku-blog_app_1 rails db:migrate
docker exec haiku-blog_app_1 rails db:seed