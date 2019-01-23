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
    footer.append($(`<span data-livestamp="${(tweet.created_at)/1000}">`));
    $tweet.append(header, content, footer);
   return $tweet[0].outerHTML;
}

// Loops through array of tweet objects, passes each one to createTweetElement, and appends the rendered result to index.html
function renderTweets(tweets) {
  $('#tweets-container').empty();
  for (let i = (tweets.length - 1); i >= 0; i--) {
     let render = createTweetElement(tweets[i]);
     $('#tweets-container').append(render);
  }
}

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

$(document).ready(function() {
  $(".new-tweet").hide();
  $(".new-tweet").find("#errorMsg").hide();
  loadTweets();
});

// When 'Compose Tweet' form is submitted, post  data to server
$(function () {
  let $form = $('.new-tweet');
  $form.on('submit', function(event) {
    event.preventDefault();
    let text = $(this).find('textarea').val();
    // Check if tweet is empty or exceeding the character limit
    if (text === null || text === "") {
      alert("You didn't enter any text!");
    } else if (text.length > 140) {
      alert("Character limit exceeded!");
    // Otherwise, post data to server
    } else {
      let serialize = $(this).find('form').serialize();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serialize
      })
      .then(function () {
        loadTweets();
      });
    }
  });
});



$(function () {
  let $button = $('#composeBtn');
  let composeHidden = true;
  $button.on('click', function() {
    if (composeHidden === true) {
      $(".new-tweet").slideDown();
      $(".new-tweet").find('textarea').focus();
      composeHidden = false;
    } else {
      $(".new-tweet").slideUp();
      composeHidden = true;
    }
  });
});


