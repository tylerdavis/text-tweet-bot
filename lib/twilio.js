require('./application');

var NUMBERS = globals.TWILIO_NUMBERS;

var twilio = require('twilio');

var client = new twilio.RestClient(globals.TWILIO_KEY, globals.TWILIO_SECRET);

exports.sms = function (tweet, to, from) {
  client.sms.messages.create({
    to : to,
    from : from || NUMBERS[Math.floor(Math.random() * NUMBERS.length)],
    body : tweet
  }, function (error, message) {
    if (!error) {
      console.log(new Date().getTime() + ' - ' + tweet);
    } else {
      console.log('There was an error sending your SMS. - ' + error.message);
    }
  })
}