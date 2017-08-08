$(document).ready(function(){

  var tweetCount = 0;
  var tweetsFiltered = false;

  function addTweet(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet" style="display: none;"></div>');
    var $tweetHeader = $('<div class="tweetHeader"><span class="tweetUser"></span><span class="divider"></span><span class="tweetTimestamp"></span></div>');
    var $tweetMessage = $('<div class="tweetMessage"></span>');

    $tweetHeader.find('.tweetUser').text('@' + tweet.user);
    $tweetHeader.find('.tweetUser').attr('data-user', tweet.user);
    $tweetHeader.find('.divider').text(' | ');
    $tweetHeader.find('.tweetTimestamp').attr('data-timestamp', tweet.created_at);
    $tweetHeader.find('.tweetTimestamp').text($.timeago(tweet.created_at));
    $tweetMessage.text(tweet.message);

    $tweet.insertAfter($('.tracker'));
    $tweetHeader.appendTo($tweet);
    $tweetMessage.insertAfter($tweetHeader);
    $tweet.show(300);
  };

  function getNewTweets() {
    while(tweetCount < streams.home.length) {
      addTweet(tweetCount);
      tweetCount += 1;
    }
  };

  function trackNewTweets() {
    if(tweetCount < streams.home.length && !tweetsFiltered) {
      $('.tracker').text(`View ${streams.home.length - tweetCount} new Ramblings`);
      $('.tracker').show('fast');
    }
  };

  function updateTimestamp() {
    var tweetTimestamps = document.getElementsByClassName('tweetTimestamp');

    for(var i = 0; i < tweetTimestamps.length; i++) {
      var $currentSpan = $(tweetTimestamps[i]);
      var timestamp = new Date($currentSpan.data('timestamp'));

      $currentSpan.text($.timeago(timestamp));
    }
  };

  $('main').on('click', '.tracker', function() {
    $('.tracker').hide('fast');
    getNewTweets();
  });

  $('main').on('click', '.tweetUser', function(event) {
    event.preventDefault();
    tweetsFiltered = !tweetsFiltered;
    $('.tracker').hide('slow');

    var clickedUser = $(this).data('user');
    var tweetUsers = document.getElementsByClassName('tweetUser');

    $('.userFeed').text('@' + clickedUser + '\'s Ramblings').toggle('slow');

    for(var i = 0; i < tweetUsers.length; i++) {
      var $currentSpan = $(tweetUsers[i]);
      var currentUser = $currentSpan.data('user');

      if(currentUser !== clickedUser) {
        $currentSpan.closest('.tweet').toggle('slow');
      }
    }
  });

  getNewTweets();
  setInterval(trackNewTweets, 1000);
  setInterval(updateTimestamp, 60000);
});