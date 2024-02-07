scoreData = [
    ["sleep-container","sleep",sleepScore],
    ["Nutrition-container","Nutrition",caloriesScore],
    ["Steps-container","Steps",stepsScore],
    ["Average-score-container","Average score",averageScore]
]; 
//Save dataset to local Storage
localStorage.setItem(JSON.stringify(todaysDate),JSON.stringify(scoreData));