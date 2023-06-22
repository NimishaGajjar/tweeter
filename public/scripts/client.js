/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "NMini",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];


  $('#post-tweet').on("submit", (function(e) {
    e.preventDefault();
    const formTweetData = $.trim($('#tweet-text').val());
    console.log(formTweetData);
    const tweetData = $(this).serialize();
    if (formTweetData.length === 0) {
      $(".empty-error").text("Enter a tweet.").slideDown(); //for error message
    }
    else if (formTweetData.length >= 140) {
      $(".empty-error").text("Your tweet is too long! Please keep it under 140 character.").slideDown(); //for error message
    } else {
      $(".empty-error").slideUp();//will slide up error message
      $.ajax("/tweets", { method: "POST", data: tweetData })
        .then(function(data) {
          loadTweets();
          $("#post-tweet").trigger("reset"); //will reset tweet bar
          $(".counter").text(140);
        });
    }

  })
  );


  const renderTweets = function(tweets) {
    for (tweet of tweets) {  // loops through tweets

      const $tweet = createTweetElement(tweet);  // calls createTweetElement for each tweet

      $('.tweets-container').prepend($tweet);  // takes return value and appends it to the tweets container
      // timeago.render(document.querySelectorAll(".time-stamp"));
    }
  };

  // Escapes unsafe characters and returns safe html. To prevent XSS
  const escape = str => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = function(tweet) {
    const $tweet = `<article class="tweet">
            <header class="tweet-header">
              <img src="${tweet.user.avatars}" alt="AVI">
              <h3 class="username">${tweet.user.name}</h3>
              <span class="handle">${tweet.user.handle}</span>
            </header>
            <div class="content">
              <p>${escape(tweet.content.text)} 
              </p>
            </div>
            <footer>
              <span class="timestamp">${timeago.format(tweet.created_at)}</span>
              <div class="icons">
                <i class="far fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>
            </footer>
          </article>`;
    return $tweet;
  };

  // gets tweets from the server and renders them on the page

  const loadTweets = () => {
    $.ajax('/tweets', {
      method: 'GET',
      dataType: 'JSON',
      success: tweets => renderTweets(tweets),
    });
  };
  loadTweets();
});


