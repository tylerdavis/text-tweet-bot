var request = require('request');

exports.get_tweets = function (filters, callback) {
  var concatFilters = filters.join('%20OR%20').replace(/ /g, '%40');
  request('http://search.twitter.com/search.json?q=' + concatFilters, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body).results);
      };
  });
}

exports.sample_tweet = function (tweets) {
  try {
    return tweets[Math.floor(Math.random() * 16)].text.replace(/RT/g, '').replace(/@\w+/g, '');
  } catch (e) {
    console.log('Twitter didn\'t return any results' + e);
  }
}