// var myClientID ="MjQ3NDgwNzd8MTYzODUwMTM2OS43OTkxNDE0";
// var mySID = "2b0b7028d8aead384e4849058a883ca9d344d06dc999989bcbee64d5e87255e3";


// luc client id = MjQ3NDc1MzZ8MTYzODQ5OTY1Ny41MTE4OTg1
// luc mySID = 2b0b7028d8aead384e4849058a883ca9d344d06dc999989bcbee64d5e87255e3

var dialog = document.getElementById("dialogModal")
var modalText = dialog.firstChild.nextSibling.firstChild.nextSibling
var eventPosting = $(".eventPostersContainer");
console.log(modalText);

var saveObj = {
    saveTitle: [],
    saveImage: [],
    saveDate: [],
    saveLocation: [],
    saveUrl: []
};

var currentdate = new Date();
var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + (currentdate.getDate()+1)

console.log(datetime)

var getUserEvents = function () {

    var userZip = $("#userZip").val();
    var userRange = $("#userRange").val();
    var gatherUserInput = `https://api.seatgeek.com/2/events?client_id=MjQ3NDc1MzZ8MTYzODQ5OTY1Ny41MTE4OTg1&geoip=${userZip}&range=${userRange}`;
    fetch(gatherUserInput).then(function (response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function(data){
                    renderItem(data);
                    console.log(data);
                });
            } else {

                modalText.textContent = "Looks like your zip code was not accepted or a desired search radius was not selected. Make sure that information is updated and we'll be able to suggest some events in your area!";
                solveTheProblem();
                return;
            }
        })
        .then(function (data) {
            console.log(data);
        });   
};

function renderItem(data) {
    console.log(data.events[0].performers[0].image);
    $(".src").attr("src",data.events[0].performers[0].image);
    for (let i = 0; i < data.events.length; i++) {

        var linkEl = $("<a></a>");
        linkEl.attr("href", data.events[i].url);
        linkEl.attr("target", "_blank");
        

        var imageEl = $("<img>").attr("id", "eventPoster");
        imageEl.attr("src", data.events[i].performers[0].image);
        imageEl.appendTo(linkEl);
        linkEl.appendTo(eventPosting);

        var eventInfo = $("<div></div>").attr("class","eventInfo col-lg-8 col-sm-6");

        var eventDescriptEL = $("<h3></h3>").attr("id", "eventTitle card-title",);
        eventDescriptEL.text(data.events[i].title);
        eventDescriptEL.appendTo(eventInfo);
        eventInfo.appendTo(eventPosting);
        
        var eventDescriptEL = $("<p> </p>").attr("id", "eventType");
        eventDescriptEL.text(data.events[i].type);
        eventDescriptEL.appendTo(eventInfo);
        eventInfo.appendTo(eventPosting);

        var eventDescriptEL = $("<p> </p>").attr("id", "eventDateTime");
        eventDescriptEL.text(data.events[i].datetime_local);
        eventDescriptEL.appendTo(eventInfo);
        eventInfo.appendTo(eventPosting);

        var eventlocationEL= $("<p></p>").attr("id", "eventDateLocation");
        eventlocationEL.text(data.events[i].venue.name);
        eventlocationEL.appendTo(eventInfo);
        eventInfo.appendTo(eventPosting);


        var saveButton =$("<button>Yes Please!</button>").attr("id","saveTheEvent").attr("class","btn-secondary btn-sm")
        saveButton.on("click", saveTheEvent);
        saveButton.appendTo(eventInfo);
        eventInfo.appendTo(eventPosting);
    }
}


var eventsInArea = document.querySelector(".eventsInArea");
$(".eventInput").submit(function (event) {
    event.preventDefault();
    eventPosting.html("");
    getUserEvents();
})




var cancelButton = document.getElementById('cancel')
function solveTheProblem() {
    dialog.showModal();
    cancelButton.addEventListener('click', function() {
        dialog.close();
    });
};



var saveTheEvent = function(event) {
    event.target;
    // THIS DOES NOT TARGET THE EVENT SELECT TO IT RETURNS A NULL VALUE
    var saveDetails = this.closest("div");
    saveObj.saveUrl.splice(0, 1, saveDetails.previousSibling.href);
    saveObj.saveImage.splice(0, 1, saveDetails.previousSibling.firstChild.src);
    saveObj.saveTitle.splice(0, 1, saveDetails.firstChild.innerText);
    saveObj.saveDate.splice(0, 1, saveDetails.firstChild.nextSibling.nextSibling.innerText);
    saveObj.saveLocation.splice(0, 1, saveDetails.firstChild.nextSibling.nextSibling.nextSibling.innerText);
console.log(saveObj);
    localStorage.setItem("savedEvent", JSON.stringify(saveObj));

    // var saveName = saveDetails.secondChild.innerHTML;
    // saveArray.saveTitle.splice(0,1, saveName);

    // console.log(saveArray)
}
