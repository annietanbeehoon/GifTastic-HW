//create topics of interests
var science = ["twisters", "tornadoes", "blizzard", "lighting", "floods", "heat waves", "hurricanes", "typhoons", "dust devils", "storm chasers", "ice storm", "hail storm"]

//display the buttons for the science array
function displayButtons() {

    $('#scienceButtons').empty();

    for (var i = 0; i < science.length; i++) {

        var b = $('<button>');

        b.addClass("science btn btn-primary");
        b.attr("data-science", science[i]);
        b.text(science[i]);
        $("#scienceButtons").append(b);
    };
};


// create function for user to add more button of their choice
$("#addScience").on("click", function (event) {
    event.preventDefault();

    var morescience = $("#science-input").val().trim();
    if (morescience == "") {
        return false; // disable blank button
    }
    science.push(morescience);

    displayButtons();
    $('#science-input').val("");
});

// create function for trigger search for gif on click
$(document).on("click", ".science", function () {

    var scienceClicked = $(this).attr("data-science")
    console.log(scienceClicked);

    $("#gifContent").empty(); // empty the gifdiv before appending new gifs.

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + scienceClicked + "&api_key=dc6zaTOxFJmzC&limit=10"
    //var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + scienceClicked + "$api_key=13KCtLZ3S5fSEBlfrQZH6bAywHMWpHcG&limit=10"
    //my own api key

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<span class='item'>");

                    // create variable to store the generated gif's rating
                    var rating = results[i].rating;

                    // create a paragraph tag with the generated gif's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // create the image tag
                    var weatherImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    weatherImage.attr("src", results[i].images.fixed_height_still.url);
                    weatherImage.attr("data-still", results[i].images.fixed_height_still.url);
                    weatherImage.attr("data-animate", results[i].images.fixed_height.url);

                    // display in the html - paragraph and weatherImage in the gifDiv
                    gifDiv.html(p);
                    gifDiv.html(weatherImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifContent").prepend(gifDiv);
                }
            }
        })


    $(document).on("click", "img", function () {
        console.log("gif clicked")
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state")
        console.log(this)

        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
})

displayButtons();