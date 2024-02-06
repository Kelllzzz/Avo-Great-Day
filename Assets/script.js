//API fetches:
//Daily Motivational Quote API fetch
var QuoteUrl = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';

//Giphy API fetch based on a translate endpoint
//Converting the quote of the day into the most fitting gif
var GiphyAPI_Key = "JlYM2XmAwmrUDSWWhLTzqgSsAOwV5YZ7"
var GiphyUrl = "api.giphy.com/v1/gifs/translate"

//Global scope variable
var QuoteText = ""; 
var userName = "";
var sleepGoal = null;
var caloriesGoal = null;
var stepsGoal = null;

//Modal page
//Page 1 - Capture username input in variables
$('#save-name').on("click", function(event) {
    event.preventDefault();
    userName = $('#username').val();
    //Store in local storage
    localStorage.setItem('Username',JSON.stringify(userName));
    console.log("Username: " + userName);
});

//Page 2 - Capture sleep goal inputs (total in minutes) in variables 
$('#save-sleep').on("click", function(event) {
    event.preventDefault();
    sleepGoal = parseInt(($('#sleep-goal-hour').val()*60), 10) + parseInt($('#sleep-goal-minute').val(), 10);
    //Store in local storage
    localStorage.setItem('sleepGoal',JSON.stringify(sleepGoal));
    console.log("Sleep Goal: " + sleepGoal + " minutes");
});

//Page 3 - Capture nutrition goal inputs in variables
$('#save-calories').on("click", function(event) {
    event.preventDefault();
    caloriesGoal = parseInt($('#calories-goal').val(), 10);
    //Store in local storage
    localStorage.setItem('caloriesGoal',JSON.stringify(caloriesGoal));
    console.log("Calories Goal: " + caloriesGoal + " calories");
});

//Page 4 - Capture steps goal inputs in variables
$('#save-steps').on("click", function(event) {
    event.preventDefault();
    stepsGoal = parseInt($('#steps-goal').val(), 10);
    //Store in local storage
    localStorage.setItem('stepsGoal',JSON.stringify(stepsGoal));
    console.log("Steps Goal: " + stepsGoal + " steps");
});

// Next for the homepage, make calendar
// id of container is "calendar-box"
//jQuery UI for datepicker and dynamically insert calendar in index.html
$(function() {
    $("#calendar-box").datepicker();
  } );

//Calendar functionality