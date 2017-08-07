$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  var tweetCount = 0;

  function prependTweet(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div style="display: none;"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message + ' | created on ' 
                + tweet.created_at);
    $tweet.prependTo($body).show(300);
  };

  (function getNewTweets() {
    while(tweetCount < streams.home.length) {
      prependTweet(tweetCount);
      tweetCount += 1;
    }
    setTimeout(getNewTweets, 1000);
  })();
});