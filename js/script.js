// edit below apikey with anything that's relevant, if api key is required.
var appid = "0011fe5c";
var apikey = "d275470047fa1b116d2b18e8130d5d08";

var TESTFETCH = function (city) {
  // edit the below link with the fetch URL.
  var runTest = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20breast&app_id=0011fe5c&app_key=d275470047fa1b116d2b18e8130d5d08&cuisineType=American&mealType=Dinner&random=true&field=label&field=image&field=ingredientLines&field=ingredients&field=calories`;

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

// hardcode specific fetch test request in thebelow call w a string.
TESTFETCH();