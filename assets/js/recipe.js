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
var appid = "5ce86110";

// ross api key
// var apikey = "d275470047fa1b116d2b18e8130d5d08";

// luc api key
var apikey = "eced3b68dfd63d133724d406c306074c";

var saveObj = {
  saveLabel: [],
  saveImg: [],
  saveIngreds: [],
  saveUrl: [],
};

var cancelButton = document.getElementById('cancel');
var dialog = document.getElementById('dialogModal');
console.log(dialog.firstChild.nextSibling.firstElementChild);
var recipeImageEl = document.querySelector(".recipeContainer");
var badInput = dialog.firstChild.nextSibling.firstElementChild;

// api is being called
var recipeFetch = function () {
  //user inputs name of ingredient and number of chosen ingredients
  var ingredientName1 = $("#ingredientName1").val();
  var ingredientName2 = "%20" + $("#ingredientName2").val();
  var ingredientName3 = "%20" + $("#ingredientName3").val();
  var ingredientName4 = "%20" + $("#ingredientName4").val();
  var ingredientNumber = $(".ingredientNumber :selected").val();

  // edit the below link with the fetch URL.
  var runTest = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredientName1}${ingredientName2}${ingredientName3}${ingredientName4}&app_id=5ce86110&app_key=eced3b68dfd63d133724d406c306074c&cuisineType=American&mealType=Dinner&random=true&field=label&field=image&field=ingredientLines&field=url&field=calories&ingr=${ingredientNumber}`;
  fetch(runTest)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        badInput.textContent = "Please select the total number of ingredients (or less) that you would like your recipe selections to have!";
        badTimesModal();
        return;
      }
    })
    .then(function (data) {
      // check console log to confirm fetch details
      console.log(data);
      if (data.hits.length > 0) {
        displayImage(data);
      }
      else {
        badInput.textContent = "Either one or more of your ingredients were misspelled or your combination of ingredients yielded no recipes. Please adjust your ingredients and try again!";
        badTimesModal();
      }
    });
    console.log(runTest);
};

// user clicks on submit button to run api fetch
$(".userInput").submit(function (e) {
  e.preventDefault();
  recipeImageEl.innerHTML = "";
  // hardcode specific fetch test request in thebelow call w a string.
  recipeFetch();
});

// displays image of recipe
function displayImage(d) {
  console.log(d);
  if (d.hits.length > 7) {
  for (let i = 0; i < 8; i++) {
    var recipeCont = document.createElement("section");
    recipeCont.setAttribute("class", "col-12 col-sm-6 col-lg-3 pr-3 py-2");
    recipeCont.setAttribute("style", "transition: width 50000ms; transition-delay: 10000ms;");
    recipeCont.setAttribute("id", [i]);
    var recipeSlct = d.hits[i].recipe;
    var recipeBrdr = document.createElement("div");
    recipeBrdr.setAttribute("class", "border border-dark pl-4 pb-2 background");
    var btnRow = document.createElement("div");
    btnRow.setAttribute("class", "row");
    var btnCol = document.createElement("div");
    btnCol.setAttribute("class", "col-12");
    var btnRow2 = document.createElement("div");
    btnRow2.setAttribute("class", "row");
    var viewRecipeClck = document.createElement("div");
    viewRecipeClck.setAttribute("class", "col-5 p-0 mr-2 ml-2");
    var saveBtnClck = document.createElement("div");
    saveBtnClck.setAttribute("class", "col-5 p-0");
    var viewRecipe = document.createElement("a");
    viewRecipe.textContent = "Recipe";
    viewRecipe.setAttribute("target", "_blank");
    viewRecipe.setAttribute("href", recipeSlct.url);
    viewRecipe.setAttribute("class", "btn btn-primary btn-sm btn-block");
    var saveRecipe = document.createElement("button");
    saveRecipe.textContent = "Choose!";
    saveBtnClck.addEventListener("click", omgSaveYum);
    saveRecipe.setAttribute("class", "btn btn-success btn-sm btn-block");
    var img = document.createElement("img");
    img.setAttribute("alt", `Tantalizing image of ${recipeSlct.label}`);
    img.src = recipeSlct.image;
    var recipeLabel = document.createElement("p");
    recipeLabel.textContent = recipeSlct.label;
    recipeLabel.setAttribute("class", "card-title border-bottom border-dark titleRecipe");
    var recipeIngred = document.createElement("ul");
    recipeIngred.setAttribute("class", "card-text");
    for (let i = 0; i < recipeSlct.ingredientLines.length; i++) {
      var recipeIngredList = document.createElement("li");
      recipeIngredList.textContent = recipeSlct.ingredientLines[i];
      recipeIngred.append(recipeIngredList);
    }
    viewRecipeClck.appendChild(viewRecipe);
    saveBtnClck.appendChild(saveRecipe);
    btnCol.appendChild(btnRow2);
    btnRow2.append(viewRecipeClck, saveBtnClck);
    btnRow.appendChild(btnCol);
    recipeBrdr.append(recipeLabel, img, btnRow);
    recipeCont.append(recipeBrdr, recipeIngred);
    recipeImageEl.append(recipeCont);
  }
}
else{
  for (let i = 0; i < d.hits.length; i++) {
    var recipeCont = document.createElement("section");
    recipeCont.setAttribute("class", "col-12 col-sm-6 col-lg-3 pr-3 py-2");
    recipeCont.setAttribute("style", "transition: width 50000ms; transition-delay: 10000ms;");
    recipeCont.setAttribute("id", [i]);
    var recipeSlct = d.hits[i].recipe;
    var recipeBrdr = document.createElement("div");
    recipeBrdr.setAttribute("class", "border border-dark pl-4 pb-2 background");
    var btnRow = document.createElement("div");
    btnRow.setAttribute("class", "row");
    var btnCol = document.createElement("div");
    btnCol.setAttribute("class", "col-12");
    var btnRow2 = document.createElement("div");
    btnRow2.setAttribute("class", "row");
    var viewRecipeClck = document.createElement("div");
    viewRecipeClck.setAttribute("class", "col-5 p-0 mr-2 ml-2");
    var saveBtnClck = document.createElement("div");
    saveBtnClck.setAttribute("class", "col-5 p-0");
    var viewRecipe = document.createElement("a");
    viewRecipe.textContent = "Recipe";
    viewRecipe.setAttribute("target", "_blank");
    viewRecipe.setAttribute("href", recipeSlct.url);
    viewRecipe.setAttribute("class", "btn btn-primary btn-sm btn-block");
    var saveRecipe = document.createElement("button");
    saveRecipe.textContent = "Choose!";
    saveBtnClck.addEventListener("click", omgSaveYum);
    saveRecipe.setAttribute("class", "btn btn-success btn-sm btn-block");
    var img = document.createElement("img");
    img.setAttribute("alt", `Tantalizing image of ${recipeSlct.label}`);
    img.src = recipeSlct.image;
    var recipeLabel = document.createElement("p");
    recipeLabel.textContent = recipeSlct.label;
    recipeLabel.setAttribute("class", "card-title border-bottom border-dark titleRecipe");
    var recipeIngred = document.createElement("ul");
    recipeIngred.setAttribute("class", "card-text");
    for (let i = 0; i < recipeSlct.ingredientLines.length; i++) {
      var recipeIngredList = document.createElement("li");
      recipeIngredList.textContent = recipeSlct.ingredientLines[i];
      recipeIngred.append(recipeIngredList);
    }
    viewRecipeClck.appendChild(viewRecipe);
    saveBtnClck.appendChild(saveRecipe);
    btnCol.appendChild(btnRow2);
    btnRow2.append(viewRecipeClck, saveBtnClck);
    btnRow.appendChild(btnCol);
    recipeBrdr.append(recipeLabel, img, btnRow);
    recipeCont.append(recipeBrdr, recipeIngred);
    recipeImageEl.append(recipeCont);
    }
}
};

var omgSaveYum = function (event) {
  event.target;
  console.log("click");
  saveObj.saveIngreds = [];
  var saveDetails = this.closest("section");
  var saveTitle = saveDetails.firstChild.firstChild.innerHTML;
  saveObj.saveLabel.splice(0, 1, saveTitle);
  var ingredSaveToObj = saveDetails.lastChild.children;
  for (let i = 0; i < ingredSaveToObj.length; i++) {
    const element = ingredSaveToObj[i];
    saveObj.saveIngreds.push(element.innerHTML);
  }
  var saveImgToObj = saveDetails.firstChild.firstChild.nextSibling.src;
  saveObj.saveImg.splice(0, 1, saveImgToObj);
  var saveRecipeUrl = saveDetails.firstChild.lastChild.firstChild.firstChild.firstChild.firstChild.href;
  (saveObj.saveUrl).splice(0,1, saveRecipeUrl);
  localStorage.setItem("savedRecipe", JSON.stringify(saveObj));
  console.log(saveRecipeUrl);
  console.log(saveObj);
}


function badTimesModal() {
    dialog.showModal();
  cancelButton.addEventListener('click', function() {
    dialog.close();
  });
};