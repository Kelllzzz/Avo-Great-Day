//Daily Motivational Quote API fetch
var QuoteUrl = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';

//Giphy API fetch based on a translate endpoint
//Converting the quote of the day into the most fitting gif
var GiphyAPI_Key = "JlYM2XmAwmrUDSWWhLTzqgSsAOwV5YZ7"
var GiphyUrl = "api.giphy.com/v1/gifs/translate"

//Global scope variable
var QuoteText = "The world is always in movement.";
var QuoteAuthor = "V. Naipaul";
var userName = "";
var sleepGoal = null;
var caloriesGoal = null;
var stepsGoal = null;

//Insert text to HTML
$('#quote-today').text(QuoteText);   //Quote
$('#author-today').text(QuoteAuthor);   //Author

//Normally, use this fetch, but for presentation, use the quote of the day directly to avoid maxing out on calls.
// fetch(QuoteUrl, {
//   method: 'GET',
//   headers: {
//     // 'X-RapidAPI-Key': '6c2681c562msh9973791c7ac2a05p14b0b6jsn4b5033f34072',
//     'X-RapidAPI-Key':'6d6efec0c9mshe4788166ac6fa7ap137c45jsnd8f32bd452f7', //Second API key
//     'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
//   }
// })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data2) {
//         //Return Quote
//         console.log(data2);
//         QuoteText = data2.text;
//         var QuoteAuthor = data2.author;
//         console.log("Quote: " + QuoteText);
//         console.log("Author: " + QuoteAuthor);
//         //Insert text to HTML
//         $('#quote-today').text(QuoteText);   //Quote
//         $('#author-today').text(QuoteAuthor);   //Author


//         //Fetch from Giphy the best gif based on today's quote using endPoint and API 
//         var GiphyQueryUrl = "https://api.giphy.com/v1/gifs/translate?&api_key=JlYM2XmAwmrUDSWWhLTzqgSsAOwV5YZ7&s=" + QuoteText;
//         fetch(GiphyQueryUrl)
//             .then(function(response) {
//                 return response.json();
//             })
//             .then(function(data3) {
//                 console.log(data3);
//                 var GifUrl = data3.data.images.original.url;
//                 console.log(GifUrl);
//                 //Insert text to HTML
//                 $('#gif-image').attr('src', GifUrl);   //Gif
//             })
//     })
//         .catch(function(error) {
//             console.error("Fetching limit reached");
//         });

//For the presentation to avoid maxing out on API calls

  
//Fetch from Giphy the best gif based on today's quote using endPoint and API 
var GiphyQueryUrl = "https://api.giphy.com/v1/gifs/translate?&api_key=JlYM2XmAwmrUDSWWhLTzqgSsAOwV5YZ7&s=" + QuoteText;
fetch(GiphyQueryUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data3) {
        console.log(data3);
        var GifUrl = data3.data.images.original.url;
        console.log(GifUrl);
        //Insert text to HTML
        $('#gif-image').attr('src', GifUrl);   //Gif
    })



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

//Today's date
var todaysDate = dayjs().format("dddd, DD MMMM YYYY");
$("#todays-date").text("Today is " + todaysDate); //Use this tag
