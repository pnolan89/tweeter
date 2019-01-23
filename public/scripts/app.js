const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];
function createTweetElement(tweet) {
  $(document).ready(function() {
    let $tweet = $('<article>').addClass("tweet");
    let header = $('<header>');
    let content = $('<span>').addClass("tweetContent").text("Hello");
    let footer = $('<footer>');
    let icons = $('<div>').addClass("icons");
    header.append(
      $('<img>').attr("src", tweet.user.avatars.small),
      $('<span>').addClass("userName").text(tweet.user.name),
      $('<span>').addClass("handle").text(tweet.user.handle)
    );
    icons.append(
      $('<span>').text('♥'),
      $('<span>').text('↻'),
      $('<span>').text('⚑')
    );
    footer.append($('<span>').addClass("timestamp").text("10 days ago"), icons);
    $tweet.append(header, content, footer);
    console.log($tweet[0].outerHTML);
  });
}

var $tweet = createTweetElement(tweetData);



