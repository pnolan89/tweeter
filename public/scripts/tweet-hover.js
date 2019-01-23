const tweetHover = function() {
  $(this).removeClass("tweet");
  $(this).addClass("tweet-hover");
};

const tweetReset = function() {
  $(this).removeClass("tweet-hover");
  $(this).addClass("tweet");
};

$(document).ready(function() {
  $(".tweet").hover(tweetHover,tweetReset);
});
