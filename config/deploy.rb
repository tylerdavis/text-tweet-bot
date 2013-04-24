set :application, "TextBob"
set :repository,  "git@github.com:tylerdavis/text-tweet-bot.git"

ssh_options[:forward_agent] = true
default_run_options[:pty] = true
set :scm, :git

set :use_sudo, false
set :keep_releases, 5
set :deploy_via, :remote_cache
set :main_js, 'app.js'

set :symlinks, {"log" => "log"}

set :branch, 'master'
set :user, 'ubuntu'
set :deploy_to, "/home/#{user}/deploy/#{application}"
server "ec2-54-224-141-226.compute-1.amazonaws.com", :app
set :forever_cmd, "/usr/bin/forever"

desc "Tail the application logfile"
task :log do
  log ="#{application_dir}/current/log/#{application}.log"
  run "tail -f #{log}"
end
