$(document).ready(function(){

  window.visitor = 'beerdrinker';

  var tweetCount = 0;
  var tweetsFiltered = false;
  var tweetsSubmitted = 0;

  function addTweet(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet panel" style="display: none;"></div>');
    var $tweetHeader = $('<div class="tweetHeader"><span class="tweetUser"></span><span class="divider"></span><span class="tweetTimestamp"></span></div>');
    var $tweetMessage = $('<div class="tweetMessage"></span>');

    $tweetHeader.find('.tweetUser').text('@' + tweet.user);
    $tweetHeader.find('.tweetUser').attr('data-user', tweet.user);
    $tweetHeader.find('.divider').text('');
    $tweetHeader.find('.tweetTimestamp').attr('data-timestamp', tweet.created_at);
    $tweetHeader.find('.tweetTimestamp').text($.timeago(tweet.created_at));
    $tweetMessage.text(tweet.message);

    $tweet.insertAfter($('.tracker'));
    $tweetHeader.appendTo($tweet);
    $tweetMessage.insertAfter($tweetHeader);
  };

  function getNewTweets() {
    while(tweetCount < streams.home.length) {
      addTweet(tweetCount);
      $('.tweet').show(300);
      tweetCount += 1;
    }
  };

  function trackNewTweets() {
    if(tweetCount < streams.home.length && !tweetsFiltered) {
      $('.tracker').find('.badge').text(`${streams.home.length - tweetCount}`);
      $('.tracker').show('fast');
    }
  };

  function updateTimestamp() {
    var tweetTimestamps = $('.tweetTimestamp');

    for(var i = 0; i < tweetTimestamps.length; i++) {
      var $currentSpan = $(tweetTimestamps[i]);
      var timestamp = new Date($currentSpan.data('timestamp'));

      $currentSpan.text($.timeago(timestamp));
    }
  };

  function tweetSubmit() {
    tweetsSubmitted += 1;
    var message = $('.typeTweet').val();
    if (message === '') {
      alert('Say something or go home, you\'re drunk!');
    } else {
      streams.users[visitor] = [];
      writeTweet(message);
      getNewTweets();
      $('.typeTweet').val('');
      $('.tracker').hide('fast');
      $('.tweetsBadge').text(tweetsSubmitted);
    }
  };
  // Listens for viewing new tweets
  $('main').on('click', '.tracker', function() {
    $('.tracker').hide('fast');
    getNewTweets();
  });

  // Listens for hover over username
  $('main').on('mouseover mouseout', '.tweetUser', function(event) {
    event.preventDefault();
    $(this).toggleClass('text-primary', 'text-primary');
  });

  // Listens for filtering by user
  $('main').on('click', '.tweetUser', function(event) {
    event.preventDefault();
    tweetsFiltered = !tweetsFiltered;
    $('.tracker').hide('slow');
    $('.createTweet').toggle('slow');

    var clickedUser = $(this).data('user');
    var tweetUsers = $('.tweetUser');

    $('.userFeed').text('@' + clickedUser + '\'s Ramblings').toggle('slow');

    for(var i = 0; i < tweetUsers.length; i++) {
      var $currentSpan = $(tweetUsers[i]);
      var currentUser = $currentSpan.data('user');

      if(currentUser !== clickedUser) {
        $currentSpan.closest('.tweet').toggle('slow');
      }
    }

    setInterval(function() {
      if(tweetsFiltered) {
        while(tweetCount < streams.home.length) {
          addTweet(tweetCount);
          if (clickedUser === $('.tweetUser').first().data('user')) {
            $('.tweet').first().show(300);
          }
          tweetCount += 1;
        }
      }
    }, 6000);
  });

  // Listens for tweet submission
  $('main').on('click', '.submitBtn', function() {
    tweetSubmit();
  });

  $('main').on('keypress', '.typeTweet', function(element) {
    if (element.keyCode === 13) {
      tweetSubmit();
    }
  });

  getNewTweets();
  setInterval(trackNewTweets, 1000);
  setInterval(updateTimestamp, 60000);
});