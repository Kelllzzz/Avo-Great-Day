//Pseudocode
// APIs required
    // Fetch nutritional value of food that was had in the day.
    // Fetch daily random quote
    // Fetch random funny gif

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
    .then(function(data) {
        //Capture calory count
        console.log(data);
        var total_calories = data.calories;
        console.log("Total calorie: " + total_calories + " cal");
    });

//Daily Motivational Quote API fetch
const QuoteUrl = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';

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
    .then(function(data) {
        //Return Quote
        console.log(data);
        var QuoteText = data.text;
        var QuoteAuthor = data.author;
        console.log("Quote: " + QuoteText);
        console.log("Author: " + QuoteAuthor);
    });
