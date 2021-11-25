docker exec haikublog_app_1 rails db:create
docker exec haikublog_app_1 rails db:migrate
docker exec haikublog_app_1 rails db:seed