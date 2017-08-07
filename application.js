$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  var tweetCount = streams.home.length;

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message  + ' | created at ' + 
                tweet.created_at);
    $tweet.appendTo($body);
    index -= 1;
  }

  setInterval(function() {
    if (streams.home.length > tweetCount) {

      while(tweetCount < streams.home.length) {
        var tweet = streams.home[tweetCount];
        var $tweet = $('<div style="display: none;"></div>');
        $tweet.text('@' + tweet.user + ': ' + tweet.message + ' | created at ' 
                    + tweet.created_at);
        $tweet.prependTo($body).show(300);
        tweetCount += 1;
      }
    }
  }, 1000)
});