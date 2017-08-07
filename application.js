$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  var tweetCount = streams.home.length;

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($body);
    index -= 1;
  }

  setInterval(function() {
    if (streams.home.length > tweetCount) {
      var tweet = streams.home[streams.home.length - 1];
      var $tweet = $('<div style="display: none;"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.prependTo($body).show('slow');
      tweetCount += 1;
    }
  }, 5000)
});