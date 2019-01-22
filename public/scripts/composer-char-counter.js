$(document).ready(function() {
  $('.new-tweet textarea').on('input', function (event) {
    $('.counter').text(140 - ($(this).val().length));
    if ((140 - $(this).val().length) < 0) {
      $('.counter').css({'color': 'red'});
    } else {
      $('.counter').css({'color': 'blue'});
    }
  });
});
