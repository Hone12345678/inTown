var recipeContainer = document.querySelector(".recipeContainer");
var recipeName = document.querySelector(".recipeName");
var recipeImage = document.querySelector(".recipeImage");
var recipeIngreds = document.querySelector(".recipeIngreds");
var recipeUrl = document.querySelector(".recipeUrl");
var eventName = document.querySelector(".eventName");
var eventImage = document.querySelector(".eventImage");
var eventDate = document.querySelector(".eventDate");
var eventLocation = document.querySelector(".eventLocation");
var eventUrl = document.querySelector(".eventUrl");

// on page load checks local storage for history
var load = function() {
    var storedRecipe = JSON.parse(localStorage.getItem("savedRecipe"));

    // if local storage has data for recipe, display to DOM
    recipeName.textContent = storedRecipe.saveLabel;
    $(".recipeImage").attr("src", storedRecipe.saveImg);

    for (let i=0; i<storedRecipe.saveIngreds.length; i++) {
        var recipeList = document.createElement("li");
        recipeList.textContent = storedRecipe.saveIngreds[i];
        recipeIngreds.append(recipeList);
    }

    recipeUrl.href = storedRecipe.saveUrl;

    var storedEvent = JSON.parse(localStorage.getItem("savedEvent"));

    console.log(storedEvent);
    // if local storage has data for event, display to DOM
    eventName.textContent = storedEvent.saveTitle;
    $(".eventImage").attr("src", storedEvent.saveImage);
    eventDate.textContent = "Date: " + storedEvent.saveDate[0];  
    eventLocation.textContent = "Location: " + storedEvent.saveLocation[0];  
    eventUrl.href = storedEvent.saveUrl[0];
}
load();
