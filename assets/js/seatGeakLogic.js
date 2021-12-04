// var myClientID ="MjQ3NDgwNzd8MTYzODUwMTM2OS43OTkxNDE0";
// var mySID = "2b0b7028d8aead384e4849058a883ca9d344d06dc999989bcbee64d5e87255e3";
var userZip = $("#userZip").val();
var userRange = $("#userRange").val();
// var eventPostersEl = document.querySelector(".eventPostersContainer");

var getUserEvents = function () {
var runTest = `https://api.seatgeek.com/2/events?client_id=MjQ3NDgwNzd8MTYzODUwMTM2OS43OTkxNDE0&geoip=${userZip}&range=${userZip}`;
  fetch(runTest)
    .then(function (response) {
        console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        alert("input invalid");
        return;
      }
    })
    .then(function (data) {
      // check console log to confirm fetch details
      (data)
      console.log(data);
    //   displayImage(data);
    });
};

$(".userInput").submit(function(event) {
    event.preventDefault();
    recipeImageEl.innerHTML = "";
    // hardcode specific fetch test request in thebelow call w a string.
    getUserEvents();
  })
  




getUserEvents();















//   city $ curl 'https://api.seatgeek.com/2/venues?city=rockford'
//  state   $ curl 'https://api.seatgeek.com/2/venues?state=il'
//  country   $ curl 'https://api.seatgeek.com/2/venues?country=US'


//               HOW TO GET EVENT RECOMENDATIONS
// Definition
// GET https://api.seatgeek.com/2/recommendations

// Events Similar To Taylor Swift In New York
// $ curl 'https://api.seatgeek.com/2/recommendations?performers.id=35&postal_code=10014&client_id=YOUR_KEY'

// Events Similar To The New York Knicks In Los Angeles
// $ curl 'https://api.seatgeek.com/2/recommendations?performers.id=2090&postal_code=90001&client_id=YOUR_KEY'

// Music Festivals Similar To Franz Ferdinand In Indio, CA In April
// $ curl 'https://api.seatgeek.com/2/recommendations?performers.id=93&postal_code=92201&datetime_local.gte=2013-04-01&datetime_local.lt=2013-05-01&taxonomies.id=2010000&client_id=YOUR_KEY'

// Events Similar To Bruce Springsteen + The Zac Brown Band in Chicago
// $ curl 'https://api.seatgeek.com/2/recommendations?performers.id=2047&performers.id=4275&postal_code=60651&client_id=YOUR_KEY'

// Events Similar To An Event In New York
// $ curl 'https://api.seatgeek.com/2/recommendations?events.id=1162104&postal_code=10014&client_id=YOUR_KEY'

// Example Response Document
// {
//   "recommendations" : [
//     {
//       score: 0.24,
//       event: {
//         id: 1327132,
//         title: "Galactic",
//         ...
//       }
//     },
//     {
//       score: 0.07,
//       event: {
//         id: 1333644,
//         title: "Talib Kweli",
//         ...
//       }
//     }
//   ]
// }