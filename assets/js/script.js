//owen seatgeek ID:
//var Client ID: MjQ3NDgwNzd8MTYzODUwMTM2OS43OTkxNDE0
//var secretid = 4429e1ae22c0aa3ee55fa52470a44d43b92d5a5c9c50e39ea7debc50f009246cS
// luc seatgeek ID:
// var clientID = "MjQ3NDc1MzZ8MTYzODQ5OTY1Ny41MTE4OTg1";
// luc seatgeek API:
// var secretid = "2b0b7028d8aead384e4849058a883ca9d344d06dc999989bcbee64d5e87255e3"; 
// ross seatgeek ID:
// var sgId = "MjQ3NDc5OTF8MTYzODUwMTM3Ny4wMDg0Njkz";

// ross seatgeek API:
// var sgapi = "a6b71eb52cb670089cf50fb5738d53648820061f6b4881cec0f37a476826e8a1";

// edit below apikey with anything that's relevant, if api key is required.
// ross appid
// var appid = "0011fe5c";

//test

// luc appid
var appid ="5ce86110";

// ross api key
// var apikey = "d275470047fa1b116d2b18e8130d5d08";

// luc api key
var apikey = "eced3b68dfd63d133724d406c306074c";	

var recipeImageEl = document.querySelector(".recipeContainer");

// api is being called
var TESTFETCH = function () {
  //user inputs name of ingredient and number of chosen ingredients
  var ingredientName1 = $("#ingredientName1").val();
  var ingredientName2 = "&q=" + $("#ingredientName2").val();
  var ingredientName3 = "&q=" + $("#ingredientName3").val();
  var ingredientName4 = "&q=" + $("#ingredientName4").val();
  var ingredientNumber = $(".ingredientNumber :selected").val();

  // edit the below link with the fetch URL.
  var runTest = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredientName1}${ingredientName2}${ingredientName3}${ingredientName4}&app_id=5ce86110&app_key=eced3b68dfd63d133724d406c306074c&cuisineType=American&mealType=Dinner&random=true&field=label&field=image&field=ingredientLines&field=url&field=calories&ingr=${ingredientNumber}`;
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
  recipeImageEl.innerHTML = "";
  // hardcode specific fetch test request in thebelow call w a string.
  TESTFETCH();
})


// displays image of recipe
function displayImage(d) {
  console.log(d);
  for (let i = 0; i < d.hits.length; i++) {
    var recipeCont = document.createElement("section");
    recipeCont.setAttribute("class", "col-3 px-5 py-2");
    var recipeSlct = d.hits[i].recipe;
    var link = document.createElement("a")
    link.setAttribute("href", recipeSlct.url);
    link.setAttribute("target", "_blank");
    var img = document.createElement("img");
    img.src = recipeSlct.image;
    img.style.cssText = 'padding: 20px; border: solid 1px';
    var recipeLabel = document.createElement("p");
    recipeLabel.textContent = recipeSlct.label;
    recipeLabel.setAttribute("class", "font-weight-bold");
    var recipeIngred = document.createElement("ul");
    for (let i = 0; i < recipeSlct.ingredientLines.length; i++) {
      var recipeIngredList = document.createElement("li");
      recipeIngredList.textContent = recipeSlct.ingredientLines[i];
      recipeIngred.append(recipeIngredList);
    }

    link.appendChild(img);
    recipeCont.append(recipeLabel, link, recipeIngred);
    recipeImageEl.append(recipeCont);
  }
}
