$(document).ready(() => {

  // toggle button for getting to the top of the screen
  const buttonToTriggerScroll = '.scroll-to-top button';
  $(window).scroll(function() {
    if ($(this).scrollTop() > 20) {
      $(buttonToTriggerScroll).fadeIn();
    } else {
      $(buttonToTriggerScroll).fadeOut();
    }
  });
  // get to the top by clicking the toggle button
  $(buttonToTriggerScroll).click(function() {  //need document ready for running this 
    $(window).scrollTop(0);
    if ($('.new-tweet').is(':hidden')) {
      $('.new-tweet').show();
    }
    $('textarea').focus();
  });

});