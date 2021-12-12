// start setting up the up the modal start
var dialog = document.getElementById("dialogModal")
var modalText = dialog.firstChild.nextSibling.firstChild.nextSibling
var eventPosting = $(".eventPostersContainer");
// end setting up the up the modal end

// start array of objects used for local storage start
var saveObj = {
    saveTitle: [],
    saveImage: [],
    saveDate: [],
    saveLocation: [],
    saveUrl: []
};
// end array of objects used for local storage end

// start gather user inputs and interact with the api start
var getUserEvents = function () {
    var userZip = $("#userZip").val();
    var userRange = $("#userRange").val();
    var gatherUserInput = `https://api.seatgeek.com/2/events?client_id=MjQ3NDc1MzZ8MTYzODQ5OTY1Ny41MTE4OTg1&geoip=${userZip}&range=${userRange}`;
    fetch(gatherUserInput).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                renderItem(data);
            });
        } else {
            // modal notifying the user of invalid input
            modalText.textContent = "Looks like your zip code was not accepted or a desired search radius was not selected. Make sure that information is updated and we'll be able to suggest some events in your area!";
            solveTheProblem();
            return;
        }
    })
};
// end gather user inputs and interact with the api end

// start display and format the relavant parts of the response from the api start
function renderItem(data) {
    for (let i = 0; i < data.events.length; i++) {

        var linkEl = $("<a></a>");
        linkEl.attr("href", data.events[i].url)
            .attr("target", "_blank")
            .attr("class", "col-sm-12 col-md-4 py-2");

        var imageEl = $("<img>");
        imageEl.attr("src", data.events[i].performers[0].image);
        imageEl.attr("class", "col")
        imageEl.appendTo(linkEl);

        // start creating and formating the continer the events display in start
        var eventContainerEl = $("<div></div>");
        eventContainerEl.addClass("border border-dark col-sm-12 mb-3 bckgrnd");

        var eventRowEl = $("<div></div>");
        eventRowEl.attr("class", "row mb-2");

        var eventRowEl2 = $("<div></div>");
        eventRowEl2.attr("class", "row");

        var eventInfo = $("<div></div>");
        eventInfo.attr("class", "col-sm-12 col-md-8 py-2");
        // end creating and formating the continer the events display in end

        // title of event
        var eventTitle = $("<h3></h3>");
        eventTitle.text(data.events[i].title);
        eventTitle.appendTo(eventInfo);

        // type of event
        var eventType = $("<p> </p>");
        var typePreText = data.events[i].type;
        // remove "_" from the type of event and replace with a " "
        var typePostText = typePreText.split("_")
            .join(' ');
        eventType.text(typePostText);
        eventType.appendTo(eventInfo);

        // date of event
        var eventDateTime = $("<p> </p>");
        // create a variable to parse data from api call
        var date = Date.parse(data.events[i].datetime_local);
        // reformat parsed data using moment.js
        var dateFormat = moment(date).format('LLL')
        // grab text from formatted date and plug into eventDateTime, then append to DOM
        eventDateTime.text(dateFormat);
        eventDateTime.appendTo(eventInfo);

        // location of event
        var eventDateLocation = $("<p></p>");
        eventDateLocation.text(data.events[i].venue.name);
        eventDateLocation.appendTo(eventInfo);

        // save button  
        var saveButton = $("<button>Yes Please!</button>").attr("class", "btn-secondary btn-sm")
        saveButton.on("click", saveTheEvent);
        saveButton.appendTo(eventInfo);

        linkEl.prependTo(eventRowEl2);
        eventInfo.appendTo(eventRowEl2);
        eventRowEl2.appendTo(eventContainerEl);
        eventContainerEl.appendTo(eventRowEl);
        eventRowEl.appendTo(eventPosting);
    }
}
// end display and format the relavant parts of the response from the api  end

// start function call to getUserEvents after user clicks the submit button start
var eventsInArea = document.querySelector(".eventsInArea");
$(".eventInput").submit(function (event) {
    event.preventDefault();
    eventPosting.html("");
    if ($("#userZip").val().length < 5 || $("#userZip").val().length > 5) {
        modalText.textContent = "Looks like your zip code was not accepted or a desired search radius was not selected. Make sure that information is updated and we'll be able to suggest some events in your area!";
        solveTheProblem();
        return;
    } else {
        getUserEvents();
    }
});
// end function call to getUserEvents after user clicks the submit button end


// start logic for modal if input of zip or range is invlaid start
var cancelButton = document.getElementById('cancel')
function solveTheProblem() {
    dialog.showModal();
    cancelButton.addEventListener('click', function () {
        dialog.close();
    });
};
// end logic for modal if input of zip or range is invlaid  end


// start local storage logic start
var saveTheEvent = function (event) {
    event.target;
    // THIS DOES NOT TARGET THE EVENT SELECT TO IT RETURNS A NULL VALUE
    var saveDetails = this.closest("div");
    saveObj.saveUrl.splice(0, 1, saveDetails.previousSibling.href);
    saveObj.saveImage.splice(0, 1, saveDetails.previousSibling.firstChild.src);
    saveObj.saveTitle.splice(0, 1, saveDetails.firstChild.innerText);
    saveObj.saveDate.splice(0, 1, saveDetails.firstChild.nextSibling.nextSibling.innerText);
    saveObj.saveLocation.splice(0, 1, saveDetails.firstChild.nextSibling.nextSibling.nextSibling.innerText);
    localStorage.setItem("savedEvent", JSON.stringify(saveObj));
}
// end local storage logic end

// END
