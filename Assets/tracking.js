// Fetch each day from local storage and chuck them 
//Today's date
var todaysDate = dayjs().format("dddd, DD MMMM YYYY");
$("#todays-date").text(todaysDate); //Use this tag

scoreData = [
    ["sleep-container","sleep",sleepScore],
    ["Nutrition-container","Nutrition",caloriesScore],
    ["Steps-container","Steps",stepsScore],
    ["Average-score-container","Average score",averageScore]
]; 
//Save dataset to local Storage
localStorage.setItem(JSON.stringify(todaysDate),JSON.stringify(scoreData));