$(function () {
  var $form = $('.new-tweet');
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