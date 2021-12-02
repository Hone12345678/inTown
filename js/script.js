// edit below apikey with anything that's relevant, if api key is required.
var apikey = "c6GprvG8gXWujVItkIA58R1fhmYGlB5D";

var TESTFETCH = function (city) {
  // edit the below link with the fetch URL.
  var runTest = `https://app.ticketmaster.com/discovery/v2/events.json?size=1&${apikey}`;

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
