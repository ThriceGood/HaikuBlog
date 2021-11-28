# HaikuBlog

A blog for Haikus. 

Created using: Rails, MySQL, GraphQL, Redis, ActionCable and ReactJS.

## Setup

In order to run this application clone the repository and:

Run `docker-compose up` to build the images and start the containers.

Once the containers are running open a new terminal window and:

Run `bin/init_db.sh` to initialize the database

## The application

Once the database has been initialize the app will now be running on http://localhost:3000

Visit the url, create and account and post some Haikus!

![HaikuBlog](/app/haikublog.png)

## Convenience scripts

To attach to the rails console run: `bin/rails_console.sh`

To run the tests run: `bin/run_tests.sh`

`./up.sh` will start the containers as daemons.

`bin/attach_app.sh` will attach to the app container's output.

`./down.sh` will shut down the running containers