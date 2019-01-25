// Given a tweet JSON object, constructs a DOM node of it
function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass("tweet").attr({"id": tweet._id});
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
    $('<i>').addClass("likeBtn").addClass("fas fa-heart"),
    $('<i>').addClass('fas fa-retweet'),
    $('<i>').addClass('fas fa-flag')
  );
  footer.append(
    $(`<span data-livestamp="${(tweet.created_at)/1000}">`),
    $('<span>').addClass('likeCounter').text(`${tweet.likes} likes`),
    icons);
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

$(function() {
  $(".new-tweet").hide();
  $(".new-tweet").find("#errorMsg").hide();
  loadTweets();

  // When 'Compose Tweet' form is submitted, post  data to server
  let $form = $('.new-tweet');
  $form.on('submit', function(event) {
    event.preventDefault();
    let text = $(this).find('textarea').val();
    // Check if tweet is empty or exceeding the character limit
    if (text === null || text === "") {
      $('#errorMsg').slideUp(function() {
        $('#errorMsg').text("Error: You didn't enter any text!");
      });
      $('#errorMsg').slideDown();
    } else if (text.length > 140) {
      $('#errorMsg').slideUp(function() {
        $('#errorMsg').text("Error: Character limit exceeded!");
      });
      $('#errorMsg').slideDown();
    // Otherwise, post data to server
    } else {
      $('#errorMsg').slideUp();
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

  // When Compose button is clicked, show or hide 'Compose Tweet' window.
  let $button = $('.composeBtn');
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

  $('#tweets-container').on('click', '.likeBtn', function() {
    if ($(this).attr("liked") === undefined || $(this).attr("liked") === 0) {
      $.ajax({
        method: 'POST',
        url: `/tweets/${$(this).parents(".tweet").attr("id")}`
      })
      .then(function() {
        loadTweets();
        $(this).parents(".tweet").find(".likeCounter").text('');
        $(this).attr("liked", 1);
      });
    } else {
      $(this).attr("liked", 0);
    }
  });
});

