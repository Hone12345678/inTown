var jumbotron = document.querySelector(".jumbotron");
var slider = document.querySelector(".slider");
var navbar = document.querySelector(".navbar");
var timeline = new TimelineMax();

// clicking the recipe match icon takes you to recipe match page
$(".recipeMatch").on("click", function () {
  location.href = "./recipe2.html";
});

// clicking the event icon takes you to event selector page
$(".seatGeek").on("click", function () {
  location.href = "./seatGeek.html";
});

// clicking the date night image takes you to recipe match page with a next button
$(".dateNight").on("click", function () {
  location.href = "./dateNight.html";
});

// animates main section to slowly display on load
timeline.fromTo(jumbotron, 1, {height:"0%"}, {height:"100%", ease: Power1.easeInOut} 
).fromTo(jumbotron, 1.2, {width:"40%"}, {width: "90%", ease: Power1.easeInOut})

// black slider display on page load
.fromTo(slider, 1, {x: "-100%"}, {x: "0%", ease: Power1.easeInOut}, "-=1.2")

.fromTo(navbar, 1.2, {opacity:0}, {opacity: 1}, "-=.5")