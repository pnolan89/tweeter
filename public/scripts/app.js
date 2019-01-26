// Retrieves tweet objects from the server
function loadTweets() {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  })
  .then(function(data) {
    renderTweets(data);
  });
}

// Takes an array of tweet objects, passes each one to createTweetElement, and appends the rendered result to index.html
function renderTweets(tweets) {
  $('#tweets-container').empty();
  for (let i = (tweets.length - 1); i >= 0; i--) {
    let render = createTweetElement(tweets[i]);
    $('#tweets-container').append(render);
  }
}

// Takes a tweet object constructs a DOM node from it
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

// "On page load" instructions begin here:
$(function() {

  // Hide new-tweet, register, and login forms
  $(".new-tweet").hide();
  $(".new-tweet").find("#errorMsg").hide();
  $("#registerForm").hide();
  $("#loginForm").hide();

  // Load and render tweets from database
  loadTweets();

  // When Compose button is clicked: show new-tweet form and hide Compose button.
  let $button = $('.composeBtn');
  $button.on('click', function() {
    $(".new-tweet").slideDown();
    $(".new-tweet").find('textarea').focus();
    $button.fadeOut();
  });

  // When new-tweet form is submitted:
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
    // Otherwise, post data to server, hide form, and show Compose button
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
        $form.slideUp();
        $('.composeBtn').fadeIn();
      });
    }
  });

  // When a tweet's like button is clicked: increases tweet's like-count by 1
  $('#tweets-container').on('click', '.likeBtn', function() {
      $.ajax({
        method: 'POST',
        url: `/tweets/${$(this).parents(".tweet").attr("id")}`
      })
      .then(function() {
        loadTweets();
      });
  });

  // When register button is clicked: shows register form and hides register button.
  let $registerBtn = $('#registerBtn');
  $registerBtn.on('click', function() {
    $('#registerForm').slideDown();
    $('#loginForm').slideUp();
    $('#loginBtn').fadeIn();
    $registerBtn.fadeOut();
  });

  // When login button is clicked: shows login form and hides login button.
  let $loginBtn = $('#loginBtn');
  $loginBtn.on('click', function () {
    $('#registerForm').slideUp();
    $('#loginForm').slideDown();
    $loginBtn.fadeOut();
    $registerBtn.fadeIn();
  });

  // When register form is submitted: posts data to server
  let $registerForm = $('#registerForm');
  $registerForm.on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/users/register',
      data: $registerForm.serialize()
    });
  });

  // When login form is submitted: posts data to server
  let $loginForm = $('#loginForm');
  $loginForm.on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/users/login',
      data: $loginForm.serialize()
    });
  });
});

