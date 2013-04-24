set :application, "TextBob"
set :repository,  "git@github.com:tylerdavis/text-tweet-bot.git"

set :scm, :git

role :web, "nginx"                          # Your HTTP server, Apache/etc
role :app, "node"                          # This may be the same as your `Web` server