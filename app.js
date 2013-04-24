var http = require('http'),
    url = require('url'),
    cronJob = require('cron').CronJob,
    twitter = require('./lib/twitter'),
    twilio = require('./lib/twilio'),
    // load globals
    vars = require('./lib/application');

var RECIP = globals.RECIP;
var FILTERS = globals.FILTERS;

function send_sms (from) {
  twitter.get_tweets(FILTERS, function (tweets) {
    twilio.sms(twitter.sample_tweet(tweets), RECIP, from);
  });
}

// Web server for sms response
http.createServer(function (req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }
  sender = url.parse(req.url, true).query.To;
  send_sms();
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end();
}).listen(1337, '127.0.0.1');

// Cron job for 
new cronJob('0 9,12,17 * * *', function() {
  send_sms();
}, null, true, 'America/New_York');

console.log('Server initialized');