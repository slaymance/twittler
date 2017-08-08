$(document).ready(function(){
  var $main = $('main').find('.feed');
  $main.html('');

  var tweetCount = 0;

  function prependTweet(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div style="display: none;"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message + ' | created on ' 
                + tweet.created_at);
    $tweet.prependTo($main).show(300);
  };

  (function getNewTweets() {
    while(tweetCount < streams.home.length) {
      prependTweet(tweetCount);
      tweetCount += 1;
    }
    setTimeout(getNewTweets, 1000);
  })();
});