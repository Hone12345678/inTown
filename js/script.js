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
    });
};


// user clicks on submit button to run api fetch
$(".userInput").submit(function(e) {
  e.preventDefault();
  
  // hardcode specific fetch test request in thebelow call w a string.
  TESTFETCH();

})