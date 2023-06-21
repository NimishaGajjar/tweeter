
$(document).ready(() => {
  $("#tweet-text").on("input", function(e) {
    $("#empty-error").slideUp();
    if (e.target.value.length < 141) {
      $("#too-long-error").slideUp();
      $("div.tweet-button-counter").find(".counter")
        .html(140 - e.target.value.length)
        .css("color", "#545149");
    }
    if (e.target.value.length > 140) {
      $("div.tweet-button-counter").find(".counter")
        .html(140 - e.target.value.length)
        .css("color", "red");
    }
  });
});