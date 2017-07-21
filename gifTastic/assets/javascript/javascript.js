var animals = [];

function getAnimalGif() {
	console.log("test");
	$(".btn").on("click", function() {
		console.log("insideclick");
		animals = $("#user").val();
		console.log(animals);
		checkAnimal(animals);
	});
};

function animateAnimalGif() {
	$(".gif").on("click", function() {
		var state = $(this).attr("data-state");

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
		}
	});
};

function getNewAnimalGif() {
	$("add-animal").on("click", function() {

		event.preventDefault();

		var newAnimal = $("#animal-input").val().trim();

		var animalCheck = jQuery.inArray(newAnimal, topics);

		if (newAnimal === "") {
			return;

			} else if (animalCheck !== -1){

			$("topic-input").val("");
			return;

			} else {
				checkAnimal(newAnimal);
			}
		});
	};

function checkAnimal(animals) {
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&limit=10&api_key=dc6zaTOxFJmzC";  
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
		}).done(function(response) {

			console.log(response);

			if (response.data.length === 0) {

				alert ("No Giphs!");

				$("#animal-input").val("");

				// return;

			} else {
				console.log(response.data);
				renderButtons(animals);

				displayGiphs(response);

				renderButtons();

				$("#animal-input").val("");

			}

			});
		};

function renderButtons(animals) {

	$(".buttons-container").empty();

	for (var i = 0; i < animals.length; i++) {

		var a = $("<button></button>");

//add attr class of btn to new buttons on line 87 .attr()
 		// a.addAnimals("btn");
//inside of btn element on line 87 add animals[i]
		a.attr("data-name", animals[i]);
		$(".buttons-container").append(a);
		console.log(animals[i]);
		
		a.text(animals[i]);

		$(".buttons-container").append(a);

		}

		animateAnimalGif();	
};

// function getGiphs(animals) {

// 	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&limit=10&api_key=dc6zaTOxFJmzC";

// 	$.ajax({
// 	url: queryURL,
// 	method: "GET"
// 	}).done(function(response) {

// 		console.log(response);

// 		displayGiphs(response);

// 	});
// };

function displayGiphs(response) {

	$("#display-giphs").empty();

	for (var i = 0; i < response.data.length; i++) {

		var giphDiv = $("<div class='giph pull-left'>");

		var rating = response.data[i].rating;

		var ratingInfo = $("<div class='rating'>").text("Rating: " + rating);

		giphDiv.append(ratingInfo);

		console.log(response.data[i].images.original.url);

		var originalGiph = response.data[i].images.original.url;

		var stillGiph = response.data[i].images.original_still.url;

		var giphImage = $("<img>").attr("src", stillGiph);

		giphImage.attr("gif");

		giphImage.attr("data-still", stillGiph);

		giphImage.attr("data-animate", originalGiph);

		giphImage.attr("data-state", "still");

		giphDiv.append(giphImage);

		$("#display-giphs").append(giphDiv);

		}

		addClickEventListener();
};

$(document).ready(function() {

	console.log("test")

	getAnimalGif();

	// renderButtons();
});