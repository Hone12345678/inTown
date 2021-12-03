<<<<<<< HEAD
//owen seatgeek ID:
//var Client ID: MjQ3NDgwNzd8MTYzODUwMTM2OS43OTkxNDE0
//var secretid = 4429e1ae22c0aa3ee55fa52470a44d43b92d5a5c9c50e39ea7debc50f009246cS
=======
// the

>>>>>>> a317d6d67dd2b1d190f375ec89c30e13c575b6ba
// luc seatgeek ID:
// var clientID = "MjQ3NDc1MzZ8MTYzODQ5OTY1Ny41MTE4OTg1";
// luc seatgeek API:
// var secretid = "2b0b7028d8aead384e4849058a883ca9d344d06dc999989bcbee64d5e87255e3"; 
<<<<<<< HEAD
=======

>>>>>>> a317d6d67dd2b1d190f375ec89c30e13c575b6ba
// ross seatgeek ID:
// var sgId = "MjQ3NDc5OTF8MTYzODUwMTM3Ny4wMDg0Njkz";

// ross seatgeek API:
// var sgapi = "a6b71eb52cb670089cf50fb5738d53648820061f6b4881cec0f37a476826e8a1";

<<<<<<< HEAD

=======
>>>>>>> a317d6d67dd2b1d190f375ec89c30e13c575b6ba
// edit below apikey with anything that's relevant, if api key is required.
// ross appid
// var appid = "0011fe5c";

// luc appid
var appid ="5ce86110";

// ross api key
// var apikey = "d275470047fa1b116d2b18e8130d5d08";

// luc api key
var apikey = "eced3b68dfd63d133724d406c306074c";	

// api is being called
var TESTFETCH = function (city) {
  //user inputs name of ingredient and number of chosen ingredients
  var ingredientName = $(".ingredientName").val();
  var ingredientNumber = $(".ingredientNumber :selected").val();
  console.log(ingredientName);
  console.log(ingredientNumber);

  // edit the below link with the fetch URL.
  var runTest = 'https://api.edamam.com/api/recipes/v2?type=public&q=' + ingredientName + '&app_id=5ce86110&app_key=eced3b68dfd63d133724d406c306074c&cuisineType=American&mealType=Dinner&random=true&field=label&field=image&field=ingredientLines&field=ingredients&field=calories&ingr=' + ingredientNumber;

  fetch(runTest)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert("input invalid");
        return;
      }
    })
    .then(function (data) {
      // check console log to confirm fetch details
      console.log(data);

      displayImage(data);
    });
};


// user clicks on submit button to run api fetch
$(".userInput").submit(function(e) {
  e.preventDefault();
  
  // hardcode specific fetch test request in thebelow call w a string.
  TESTFETCH();
})


// displays image of recipe
function displayImage( d ) {
  $(".recipeImage").attr("src", d.hits[0].recipe.image);

  var img = document.createElement("img");
    img.src = d.hits[1].recipe.image;
    img.style.cssText = `padding: 20px;`
    document.querySelector(".recipeImage").after(img);

    var img = document.createElement("img");
    img.src = d.hits[2].recipe.image;
    img.style.cssText = `padding: 20px;`
    document.querySelector(".recipeImage").after(img);

    var img = document.createElement("img");
    img.src = d.hits[3].recipe.image;
    img.style.cssText = `padding: 20px;`
    document.querySelector(".recipeImage").after(img);

    var img = document.createElement("img");
    img.src = d.hits[4].recipe.image;
    img.style.cssText = `padding: 20px;`
    document.querySelector(".recipeImage").after(img);
}
