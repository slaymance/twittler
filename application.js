$(document).ready(function(){

  var tweetCount = 0;

  function addTweet(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet" style="display: none;"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message + ' | created on ' 
                + tweet.created_at);
    $tweet.insertAfter($('.tracker')).show(300);
  };

  (function getNewTweets() {
    while(tweetCount < streams.home.length) {
      addTweet(tweetCount);
      tweetCount += 1;
    }

    $('main').on('click', '.tracker', function() {
      $('.tracker').hide('fast');
      getNewTweets();
    });
  })();

  (function trackNewTweets() {
    if(tweetCount < streams.home.length) {
      $('.tracker').text(`View ${streams.home.length - tweetCount} new Twittles`);
      $('.tracker').show('fast');
    }
    setTimeout(trackNewTweets, 1000);
  })();
});