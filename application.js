$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  var tweetCount = streams.home.length;

  function prependTweet(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div style="display: none;"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message + ' | created on ' 
                + tweet.created_at);
    $tweet.prependTo($body).show(300);
  };

  var index = streams.home.length - 1;
  while(index >= 0){
    prependTweet(index);
    index -= 1;
  }

  setInterval(function() {
    if (streams.home.length > tweetCount) {

      while(tweetCount < streams.home.length) {
        prependTweet(tweetCount);
        tweetCount += 1;
      }
    }
  }, 1000)
});