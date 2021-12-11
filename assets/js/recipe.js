// luc appid
var appid = "5ce86110";
// luc api key
var apikey = "eced3b68dfd63d133724d406c306074c";

// ross appid (in case we get locked out of the above)
// var appid = "0011fe5c";
// ross api key (in case we get locked out of the above)
// var apikey = "d275470047fa1b116d2b18e8130d5d08";


// object where recipe details are to be pushed to and saved to local storage
var saveObj = {
  saveLabel: [],
  saveImg: [],
  saveIngreds: [],
  saveUrl: [],
};

// global vars to be used 
var cancelButton = document.getElementById('cancel');
var dialog = document.getElementById('dialogModal');
var recipeImageEl = document.querySelector(".recipeContainer");
var badInput = dialog.firstChild.nextSibling.firstElementChild;

// api is being called
var recipeFetch = function () {
  //user inputs name of ingredient and max number of ingredients in randomly selected recipe results
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
        // display modal if no max number of ingredients were selected.
        badInput.textContent = "Please select the total number of ingredients (or less) that you would like your recipe selections to have!";
        badTimesModal();
        return;
      }
    })
    .then(function (data) {
      // check console log to confirm fetch details
      if (data.hits.length > 0) {
        displayImage(data);
      }
      else {
        // display modal if there were no recipe results using combination of ingredients or if recipe ingredient was mispelled.
        badInput.textContent = "Either one or more of your ingredients were misspelled or your combination of ingredients yielded no recipes. Please adjust your ingredients and try again!";
        badTimesModal();
      }
    });
};

// user clicks on submit button to run api fetch
$(".userInput").submit(function (e) {
  e.preventDefault();
  recipeImageEl.innerHTML = "";
  // hardcode specific fetch test request in thebelow call w a string.
  recipeFetch();
});

// displays and styles each recipe. limits displayed results to 8 of the potential 20 random recipe returns.
function displayImage(d) {
  if (d.hits.length > 7) {
  for (let i = 0; i < 8; i++) {
    var recipeCont = document.createElement("section");
    recipeCont.setAttribute("class", "col-12 col-sm-6 col-lg-3 pr-3 py-2");
    recipeCont.setAttribute("style", "transition: width 50000ms; transition-delay: 10000ms;");
    recipeCont.setAttribute("id", [i]);
    var recipeSlct = d.hits[i].recipe;
    var recipeBrdr = document.createElement("div");
    recipeBrdr.setAttribute("class", "border border-dark pl-3 pb-2 background");
    var btnRow = document.createElement("div");
    btnRow.setAttribute("class", "row pr-3");
    var viewRecipeClck = document.createElement("div");
    viewRecipeClck.setAttribute("class", "col-6 pr-1");
    var saveBtnClck = document.createElement("div");
    saveBtnClck.setAttribute("class", "col-6 pl-1");
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
    img.setAttribute("class", "pr-3")
    img.src = recipeSlct.image;
    var recipeLabel = document.createElement("p");
    recipeLabel.textContent = recipeSlct.label;
    recipeLabel.setAttribute("class", "card-title text-center border-bottom border-dark titleRecipe mr-3");
    var ingredContainerEl = document.createElement("div");
    var recipeIngred = document.createElement("ul");
    recipeIngred.innerHTML = "<u>Recipe Ingredients:</u>";
    recipeIngred.setAttribute("class", "card-text pr-2");
    for (let i = 0; i < recipeSlct.ingredientLines.length; i++) {
      var recipeIngredList = document.createElement("li");
      recipeIngredList.textContent = recipeSlct.ingredientLines[i];
      recipeIngred.append(recipeIngredList);
    }
// start organizing appends to the DOM
    viewRecipeClck.appendChild(viewRecipe);
    saveBtnClck.appendChild(saveRecipe);
    btnRow.append(viewRecipeClck, saveBtnClck);
    ingredContainerEl.append(recipeIngred);
    recipeBrdr.append(recipeLabel, img, btnRow, ingredContainerEl);
    recipeCont.append(recipeBrdr);
    recipeImageEl.append(recipeCont);
  }
}
// create the same display as above if the recipes number LESS than 8
else{
  for (let i = 0; i < d.hits.length; i++) {
    var recipeCont = document.createElement("section");
    recipeCont.setAttribute("class", "col-12 col-sm-6 col-lg-3 pr-3 py-2");
    recipeCont.setAttribute("style", "transition: width 50000ms; transition-delay: 10000ms;");
    recipeCont.setAttribute("id", [i]);
    var recipeSlct = d.hits[i].recipe;
    var recipeBrdr = document.createElement("div");
    recipeBrdr.setAttribute("class", "border border-dark pl-3 pb-2 background");
    var btnRow = document.createElement("div");
    btnRow.setAttribute("class", "row pr-3");
    var viewRecipeClck = document.createElement("div");
    viewRecipeClck.setAttribute("class", "col-6 pr-1");
    var saveBtnClck = document.createElement("div");
    saveBtnClck.setAttribute("class", "col-6 pl-1");
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
    img.setAttribute("class", "pr-3")
    img.src = recipeSlct.image;
    var recipeLabel = document.createElement("p");
    recipeLabel.textContent = recipeSlct.label;
    recipeLabel.setAttribute("class", "card-title text-center border-bottom border-dark titleRecipe mr-3");
    var ingredContainerEl = document.createElement("div");
    var recipeIngred = document.createElement("ul");
    recipeIngred.innerHTML = "<u>Recipe Ingredients:</u>";
    recipeIngred.setAttribute("class", "card-text pr-2");
    for (let i = 0; i < recipeSlct.ingredientLines.length; i++) {
      var recipeIngredList = document.createElement("li");
      recipeIngredList.textContent = recipeSlct.ingredientLines[i];
      recipeIngred.append(recipeIngredList);
    }
    // start organizing appends to the DOM
    viewRecipeClck.appendChild(viewRecipe);
    saveBtnClck.appendChild(saveRecipe);
    btnRow.append(viewRecipeClck, saveBtnClck);
    ingredContainerEl.append(recipeIngred);
    recipeBrdr.append(recipeLabel, img, btnRow, ingredContainerEl);
    recipeCont.append(recipeBrdr);
    recipeImageEl.append(recipeCont);
    }
}
};
// target relevant save features 
var omgSaveYum = function (event) {
  event.target;
  var saveDetails = this.closest("section").firstChild;
  var saveTitle = saveDetails.firstChild.innerHTML;
  saveObj.saveLabel.splice(0, 1, saveTitle);
  var ingredSaveToObj = saveDetails.lastChild.firstElementChild.children;
  for (let i = 1; i < ingredSaveToObj.length; i++) {
    var element = ingredSaveToObj[i];
    saveObj.saveIngreds.push(element.innerHTML);
  }
  var saveImgToObj = saveDetails.firstChild.nextSibling.src;
  saveObj.saveImg.splice(0, 1, saveImgToObj);
  var saveRecipeUrl = saveDetails.firstChild.nextSibling.nextSibling.firstChild.firstChild.href;
  (saveObj.saveUrl).splice(0,1, saveRecipeUrl);
  localStorage.setItem("savedRecipe", JSON.stringify(saveObj));
}

// in case of bad recipe ingredient input, no recipe results with inputs, or no ingredient max chosen, display this modal.
function badTimesModal() {
    dialog.showModal();
  cancelButton.addEventListener('click', function() {
    dialog.close();
  });
};