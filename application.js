$(document).ready(function(){

  var tweetCount = 0;

  function addTweet(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet" style="display: none;"></div>');
    var $tweetHeader = $('<div class="tweetHeader"><span class="tweetUser"></span><span class="divider"></span><span class="tweetTimestamp"></span></div>');
    var $tweetMessage = $('<div class="tweetMessage"></span>');

    $tweetHeader.find('.tweetUser').text('@' + tweet.user);
    $tweetHeader.find('.divider').text(' | ');
    $tweetHeader.find('.tweetTimestamp').attr('data-timestamp', tweet.created_at);
    $tweetHeader.find('.tweetTimestamp').text($.timeago(tweet.created_at));
    console.log(tweet.created_at);
    $tweetMessage.text(tweet.message);

    $tweet.insertAfter($('.tracker'));
    $tweetHeader.appendTo($tweet);
    $tweetMessage.insertAfter($tweetHeader);
    $tweet.show(300);
  };

  (function updateTimestamp() {
    var tweetTimestamps = document.getElementsByClassName('tweetTimestamp');

    for(var i = 0; i < tweetTimestamps.length; i++) {
      var currentSpan = $(tweetTimestamps[i]);
      var timestamp = new Date(currentSpan.data('timestamp'));
      
      currentSpan.text($.timeago(timestamp));
    }
    setTimeout(updateTimestamp, 6000);
  })();

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