var http = require('http'),
    url = require('url'),
    cronJob = require('cron').CronJob,
    twitter = require('./lib/twitter'),
    twilio = require('./lib/twilio'),
    // load globals
    vars = require('./lib/application');

var RECIPS = globals.RECIPS;
var FILTERS = globals.FILTERS;

function sendSms (to, from) {
  twitter.get_tweets(FILTERS, function (tweets) {
    twilio.sms(twitter.sample_tweet(tweets), to, from);
  });
}

function sendSmsToEveryone (from) {
  for (var i = RECIPS.length - 1; i >= 0; i--) {
    var to = RECIPS[i];
    sendSms(to, from);
  };
}

// Web server for sms response
http.createServer(function (req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  }
  var params = url.parse(req.url, true).query;
  var sender = params.To;
  var reciever = params.From;
  sendSms(reciever, sender)
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end();
}).listen(1337, '127.0.0.1');

// Cron job 
new cronJob('0 9,10,11,12,13,14,15,16,17,18,19,20 * * *', function() {
  sendSmsToEveryone();
}, null, true, 'America/New_York');

console.log('Server initialized');