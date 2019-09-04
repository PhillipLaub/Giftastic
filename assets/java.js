var array = ["Rick and Morty", "Star Wars", "Final Fantasy", "Call of Duty", "Batman", " The Flash", "Marvel Comics", "Playstation", "Breaking Bad", "Dragonball Z", "GOTG"];

var cutOffRating = "PG-13";


function showContainer(search){
	$.ajax({
        //API Key = 572FQQ5mZQxt5r5sJc15vOfze3FVTOyf
		url: "https://api.giphy.com/v1/gifs/search?q=" + search + 
		"&api_key=572FQQ5mZQxt5r5sJc15vOfze3FVTOyf&rating=" + cutOffRating + "&limit=10",
        method: "GET"
        
	}).then(function(response){
		response.data.forEach(function(element){

			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
            newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
            
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$("#gif-container").addClass("border1");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){

			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
            }
            
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

function makeButtons(){
	for(var i = 0; i < array.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("addtlButton");
		newButton.text(array[i]);
		$("#button-container").append(newButton);
    }
    
	$(".addtlButton").unbind("click");

	$(".addtlButton").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("border1");
		showContainer($(this).text());
	});

}

function addButton(search){
    
	if(array.indexOf(search) === -1) {
		array.push(search);
		$("#button-container").empty();
		makeButtons();
	}
}



$(document).ready(function(){
	makeButtons();
	$("#submit").on("click", function(){

        event.preventDefault();
        
		addButton($("#new-btn").val().trim());
		$("#new-btn").val("");
	});
});