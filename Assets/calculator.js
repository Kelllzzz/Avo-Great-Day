//Edamam API fetch:
//Edamam API ID and keys
var EdamanAPI_ID = "181983d3";
var EdamanAPI_Key = "f419ea241fd50c7fbf94fe990f801e76";

//Global scope variable
var scoreData = [];

//Today's date
var todaysDate = dayjs().format("dddd, DD MMMM YYYY");
$("#todays-date").text(todaysDate); //Use this tag

//Score calcs - inputs from HTML page: journal.html
//variables to capture from journal input apply parseInt(x,10)
var sleepInput = ""; //Input for daily sleep amount (minutes)
var caloriesInput = 0; //Input for daily calories (cal) intake taken from API calcs
var stepsInput = ""; //Input for daily steps (steps)

//Event listener when inputs are submitted
$('#calories-btn').on("click", function() { 
    //Calories input calcs based on text inputs - Edaman API fetch
    
    var food_input = $('#nutrition-input').val();  //Use this tag
    console.log("food input is: " + food_input)

    // Construct the URL based on text provided
    var EdQueryUrl = "https://api.edamam.com/api/nutrition-data?app_id=" + EdamanAPI_ID + "&app_key=" + EdamanAPI_Key + "&ingr=" + food_input;
    
    //Fetch call to get calory intake
    fetch(EdQueryUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data1) {
            //Capture calory count
            console.log(data1);
            caloriesInput = data1.calories;
            console.log("Total calorie: " + caloriesInput + " cal");
            localStorage.setItem('calories',JSON.stringify(caloriesInput));

            //Show in the page the equivalent calory count
            $('#calories-result').text("Based on your input you have consumed " + caloriesInput + " calories on this day!") //Use this tag
        });

        return caloriesInput;
});

$('#submit-input-btn').on("click", function() {

    //Sleep input
    var sleepInput = parseInt(($('#sleep-input-hour').val()*60), 10) + parseInt($('#sleep-input-minute').val(), 10);  //Use this tag
    //var caloriesInput = JSON.parse(localStorage.getItem('calories'));
    
    //Steps input
    var stepsInput = parseInt($('#steps-input').val(), 10);   

    //Fetch the goals from localstorage
    var fetchedSleepGoal = JSON.parse(localStorage.getItem('sleepGoal'));
    var fetchedCaloriesGoal = JSON.parse(localStorage.getItem('caloriesGoal'));
    var fetchedStepGoal = JSON.parse(localStorage.getItem('stepsGoal'));

    console.log("fetchedSleepGoal: " + fetchedSleepGoal);
    console.log("fetchedCaloriesGoal: " + fetchedCaloriesGoal);
    console.log("fetchedStepGoal: " + fetchedStepGoal);
    console.log("sleepInput: " + sleepInput);
    console.log("caloriesInput: " + caloriesInput);
    console.log("stepsInput: " + stepsInput);

    //Sleep score calculation in % sleeping too little or too much is bad
    if(sleepInput <= fetchedSleepGoal) {
        sleepScore = parseInt(((sleepInput/fetchedSleepGoal) * 100).toFixed(0),10);
    } else {
        sleepScore = parseInt((100 - (((sleepInput - fetchedSleepGoal)/fetchedSleepGoal) * 100)).toFixed(0),10)
    };

    //Calories score calculation in % eating too little or too much is bad
    if(caloriesInput <= fetchedCaloriesGoal) {
        caloriesScore = parseInt(((caloriesInput/fetchedCaloriesGoal) * 100).toFixed(0),10);
    } else {
        caloriesScore = parseInt((100 - (((caloriesInput - fetchedCaloriesGoal)/fetchedCaloriesGoal) * 100)).toFixed(0),10)
    };

    //Steps score calculation in % walking too much is good!
    if(stepsInput <= fetchedStepGoal) {
        stepsScore = parseInt(((stepsInput/fetchedStepGoal) * 100).toFixed(0),10);
    } else {
        stepsScore = 100;
    };

    //Average score
    var averageScore = parseInt(((sleepScore + caloriesScore + stepsScore)/3).toFixed(0),10);
    console.log(sleepScore);
    console.log(caloriesScore);
    console.log(stepsScore);

    console.log(averageScore);
    //Method 1 - doughnut chart code
    anychart.onDocumentReady(function () {  
        //Chart data
        scoreData = [
            ["sleep-container","sleep",sleepScore],
            ["Nutrition-container","Nutrition",caloriesScore],
            ["Steps-container","Steps",stepsScore],
            ["Average-score-container","Average score",averageScore]
        ]; 

        //Loop to make 4 charts
        for(let j = 0; j < scoreData.length; j++) {
            var eachScore = anychart.data.set([
                [scoreData[j][1],scoreData[j][2]],
                ["left",(100-[scoreData[j][2]])]
            ])
            if(typeof eachScore === 'undefined') {
                console.log("Chart function awaits data.")
            } else {
            //Pie chart and radius
            var chart = anychart.pie(eachScore)
            .innerRadius('50%');
            //Chart title and container id
            chart.title(scoreData[j][1] + " = " + scoreData[j][2] + "%");
            let containerName = scoreData[j][0];
            console.log(containerName);
            chart.container(containerName);
            chart.draw();
            }
        }
    })
});

