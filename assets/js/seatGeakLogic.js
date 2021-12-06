// var myClientID ="MjQ3NDgwNzd8MTYzODUwMTM2OS43OTkxNDE0";
// var mySID = "2b0b7028d8aead384e4849058a883ca9d344d06dc999989bcbee64d5e87255e3";


var currentdate = new Date();
var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate()

console.log(datetime)

var getUserEvents = function () {

    var userZip = $("#userZip").val();
    var userRange = $("#userRange").val();
    var gatherUserInput = `https://api.seatgeek.com/2/events?client_id=MjQ3NDgwNzd8MTYzODUwMTM2OS43OTkxNDE0&geoip=${userZip}&range=${userRange}`;
    fetch(gatherUserInput).then(function (response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function(data){
                    renderItem(data);
                    console.log(data);
                });
            } else {
                alert("input invalid");
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
    var imageContainer = $(".eventPostersContainer");
    for (let i = 0; i < data.events.length; i++) {
        var imageSection = $("<section></section>");
        imageSection.attr("class", "col-3 px-5 py-2");
        var linkEl = $("<a></a>");
        linkEl.attr("href", data.events[i].url);
        linkEl.attr("target", "_blank");
        var imageEl = $("<img>").attr("id", "eventPoster");
        imageEl.attr("src", data.events[i].performers[0].image);
        imageEl.appendTo(linkEl);
        linkEl.appendTo(imageContainer, imageEl);
        var eventDescriptEL = $("<p></p>").attr("id", "eventTitle");
        eventDescriptEL.text(data.events[i].title);
        eventDescriptEL.appendTo(imageContainer);
        var eventDescriptEL = $("<p></p>").attr("id", "eventType");
        eventDescriptEL.text(data.events[i].type);
        eventDescriptEL.appendTo(imageContainer);
        var eventDescriptEL = $("<p></p>").attr("id", "eventDateTime");
        eventDescriptEL.text(data.events[i].datetime_utc);
        eventDescriptEL.appendTo(imageContainer);
       
     
    }

}


var eventsInArea = document.querySelector(".eventsInArea");
$(".eventInput").submit(function (event) {
    event.preventDefault();
   
    getUserEvents();
})

