var recipeContainer = document.querySelector(".recipeContainer");
var recipeName = document.querySelector(".recipeName");
var recipeImage = document.querySelector(".recipeImage");
var recipeIngreds = document.querySelector(".recipeIngreds");
var recipeUrl = document.querySelector(".recipeUrl");
var savedArray = [];

// on page load checks local storage for history
var load = function() {
    var storedRecipe = JSON.parse(localStorage.getItem("savedRecipe"));

    // if local storage has data, display to DOM
    recipeName.textContent = storedRecipe.saveLabel;
    $(".recipeImage").attr("src", storedRecipe.saveImg);

    for (let i=0; i<storedRecipe.saveIngreds.length; i++) {
        var recipeList = document.createElement("li");
        recipeList.textContent = storedRecipe.saveIngreds[i];
        recipeIngreds.append(recipeList);
    }

    recipeUrl.href = storedRecipe.saveUrl;
}
load();