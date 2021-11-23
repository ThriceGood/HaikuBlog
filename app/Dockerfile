FROM ruby:2.7.4-buster
RUN apt-get update -qq && apt-get install -y \
    vim \
    nodejs \
    npm \
    && rm -rf /var/cache/apt/*
RUN npm install -g yarn
WORKDIR /app
COPY Gemfile* /app/
RUN bundle install
COPY . /app
RUN yarn install --check-files

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]