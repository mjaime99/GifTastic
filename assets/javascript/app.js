$(document).ready(function() {
var topics = ["LA Dodgers", "LA Clippers", "LA Kings", "Pittsburgh Steelers"];

function renderButtons() {

  $('#buttons').empty();
  for (var i = 0; i < topics.length; i++) {
    var teamBtn = $('<button>');
    teamBtn.addClass('team-button team-button-color');
    teamBtn.attr('data-team', topics[i]);
    teamBtn.appendTo('#buttons');
    teamBtn.text(topics[i]);
    $('.team-button').on('click', displayGifs);
  }
};
//Function to create button for user input
$("#add-team").on("click", function (event) {

  event.preventDefault();

  var input = $('#team-input').val();
  topics.push(input);
  $('#add-team').empty();
  renderButtons();
});

renderButtons();

//Function to display GIFs
function displayGifs() {
  $('#gifs-appear-here').empty();
  var team = $(this).attr('data-team');
  console.log(team);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=4lKQIGcIqYJp4vgYepvwYkHdb28Gf6q3&limit=10";

  //AJAX Call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response.data);

    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var teamDiv = $('<div>');
      var p = $('<p>');
      p.text('Rating: ' + results[i].rating);
      var teamImage = $('<img>')
      teamImage.addClass('team-image');
      teamImage.attr('src', results[i].images.fixed_height.url);
      teamImage.attr('data-still', results[i].images.fixed_height_still.url);
      teamImage.attr('data-animate', results[i].images.fixed_height.url);
      console.log(results[i].images);
      teamImage.attr('data-state', "still");
      teamDiv.append(p);
      teamDiv.append(teamImage);
      $('#gifs-appear-here').prepend(teamDiv);
    }

    $('#gifs-appear-here').on("click", ".team-image", function (event) {
      console.log(this);
      event.preventDefault()
      var state = $(this).attr("data-state");
      console.log(state);
      if (state === "still") {

        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
};
});