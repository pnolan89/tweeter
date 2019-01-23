// Given a tweet JSON object, constructs a DOM node of it
function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass("tweet");
    let header = $('<header>');
    let content = $('<p>').addClass("tweetContent").text(tweet.content.text);
    let footer = $('<footer>');
    let icons = $('<div>').addClass("icons");
    header.append(
      $('<img>').attr("src", tweet.user.avatars.small),
      $('<span>').addClass("userName").text(tweet.user.name),
      $('<span>').addClass("handle").text(tweet.user.handle)
    );
    icons.append(
      $('<i>').addClass('fas fa-heart'),
      $('<i>').addClass('fas fa-retweet'),
      $('<i>').addClass('fas fa-flag')
    );
    footer.append($('<span>').addClass("timestamp").text("10 days ago"), icons);
    $tweet.append(header, content, footer);
   return $tweet[0].outerHTML;
}

// Loops through array of tweet objects, passes each one to createTweetElement, and appends the rendered result to index.html
function renderTweets(tweets) {
  for (let i in tweets) {
     let render = createTweetElement(tweets[i]);
     $('#tweets-container').append(render);
  }
}

$(document).ready(function() {
  // Get tweet JSONs from the server
  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
    .then(function(data) {
      renderTweets(data);
    });
  }
  loadTweets();
});

// When 'Compose Tweet' form is submitted, post  data to server
$(function () {
  let $form = $('.new-tweet');
  $form.on('submit', function(event) {
    event.preventDefault();
    let serialize = $(this).find('form').serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: serialize
    })
    .then(function () {
      console.log('Success');
    });
  });
});


