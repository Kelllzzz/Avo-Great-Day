//API fetches:
// Edamam API fetch:
//Edamam API keys
var EdamanAPI_ID = "181983d3";
var EdamanAPI_Key = "f419ea241fd50c7fbf94fe990f801e76";

 // Food input example
var food_input = "100g of sweetcorn and 50g of biscuit and 20g of rice";

 // Construct the URL
 var EdQueryUrl = "https://api.edamam.com/api/nutrition-data?app_id=" + EdamanAPI_ID + "&app_key=" + EdamanAPI_Key + "&ingr=" + food_input;
 
//Fetch call to get calory intake
fetch(EdQueryUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data1) {
        //Capture calory count
        console.log(data1);
        var total_calories = data1.calories;
        console.log("Total calorie: " + total_calories + " cal");
    });

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


fetch(QuoteUrl, {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '6c2681c562msh9973791c7ac2a05p14b0b6jsn4b5033f34072',
    'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
  }
})
    .then(function(response) {
        return response.json();
    })
    .then(function(data2) {
        //Return Quote
        console.log(data2);
        QuoteText = data2.text;
        var QuoteAuthor = data2.author;
        console.log("Quote: " + QuoteText);
        console.log("Author: " + QuoteAuthor);

        //Fetch from Giphy the best gif based on today's quote using endPoint and API 
        var GiphyQueryUrl = "https://api.giphy.com/v1/gifs/translate?&api_key=JlYM2XmAwmrUDSWWhLTzqgSsAOwV5YZ7&s=God always takes the simplest way.";
        var GiphyQueryUrl = "https://api.giphy.com/v1/gifs/translate?&api_key=JlYM2XmAwmrUDSWWhLTzqgSsAOwV5YZ7&s=" + QuoteText;
        fetch(GiphyQueryUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data3) {
                console.log(data3);
                var GifUrl = data3.data.images.original.url;
                console.log(GifUrl);
            })
    });

// Next for the homepage, make calendar
// id of container is "calendar-box"
//jQuery UI for datepicker and dynamically insert calendar in index.html
$(function() {
    $("#calendar-box").datepicker();
  } );

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



//JavaScript for Journal
var todaysDate = dayjs().format("dddd, DD MMMM YYYY");
$("#todays-date").text(todaysDate);


//Score calcs - inputs from HTML page: journal.html
//variables to capture from journal input apply parseInt(x,10)
var sleepInput = ""; //Input for daily sleep amount (minutes)
var caloriesInput = parseInt(total_calories,10); //Input for daily calories (cal) intake taken from API calcs
var stepsInput = ""; //Input for daily steps (steps)

// sleepGoal in minutes
// caloriesGoal in calories
// stepsGoal in steps

var sleepScore = sleepInput/sleepGoal * 100; //sleep score in %
var caloriesScore = caloriesInput/caloriesGoal * 100; //nutrition score in %
var stepsScore = stepsInput/stepsGoal * 100; //steps goals in %

//Sleep score calculation in % sleeping too little or too much is bad
if(sleepInput <= sleepGoal) {
    sleepScore = ((sleepInput/sleepGoal, 10) * 100).toFixed(0);
} else {
    sleepScore = (100 - (((sleepInput - sleepGoal)/sleepGoal) * 100)).toFixed(0)
};

//calories score calculation in % eating too little or too much is bad
if(caloriesInput <= caloriesGoal) {
    caloriesScore = ((caloriesInput/caloriesGoal, 10) * 100).toFixed(0);
} else {
    caloriesScore = (100 - (((caloriesInput - caloriesGoal)/caloriesGoal) * 100)).toFixed(0)
};

//steps score calculation in % eating too much is good!
if(stepsInput <= stepsGoal) {
    stepsScore = ((stepsInput/stepsGoal, 10) * 100).toFixed(0);
} else {
    stepsScore = 100;
};