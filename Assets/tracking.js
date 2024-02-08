//Fake tracking code just for example

//Graph script
anychart.onDocumentReady(function () {
    // create column chart
    var chart = anychart.column();

    //Today's date
    var todaysDate = dayjs().format("dddd DD MMMM YYYY");
    $("#todays-date").text(todaysDate); //Use this tag

    //Get data from local storage
      var dataSet = anychart.data.set([
      ['Friday, 02 February 2024', 63, 90, 75, 76],
      ['Saturday, 03 February 2024', 71, 85, 97, 84],
      ['Sunday, 04 February 2024', 56, 68, 96, 73],
      ['Monday, 05 February 2024', 74, 86, 55, 72],
      ['Tuesday, 06 February 2024', 41, 98, 64, 68],
      ['Wednesday, 07 February 2024', 88, 77, 55, 73]
    ]);

    // set chart title
    chart.title('Your daily scores so far!');

    // map data for the first series, take x from the zero column and value from the first column of data set
    var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });

    // map data for the second series, take x from the zero column and value from the second column of data set
    var secondSeriesData = dataSet.mapAs({ x: 0, value: 2 });

    // map data for the third series, take x from the zero column and value from the third column of data set
    var thirdSeriesData = dataSet.mapAs({ x: 0, value: 3 });
    
    // map data for the fourth series, take x from the zero column and value from the fourth column of data set
    var fourthSeriesData = dataSet.mapAs({ x: 0, value: 4 });

    // create first series with mapped data
    var seriesFirst = chart.column(firstSeriesData);
    seriesFirst.name('Sleep');

    var shapes = seriesFirst.rendering().shapes();

    seriesFirst.color('#3F9CD7');
    // set rendering settings
    seriesFirst
      .rendering()
      // set point function to drawing
      .point(drawer)
      // set update point function to drawing, change the point shape when the state changes
      .updatePoint(drawer)
      // set shapes
      .shapes(shapes);

    var seriesSecond = chart.column(secondSeriesData);
    seriesSecond
      .name('Steps')
      .color('#F37E59')
      .stroke(anychart.color.darken(this.sourceColor, 1));
    // set rendering settings
    seriesSecond
      .rendering()
      // set point function to drawing
      .point(drawer)
      // set update point function to drawing, change the point shape when the state changes
      .updatePoint(drawer)
      // set shapes
      .shapes(shapes);

      var seriesThird = chart.column(thirdSeriesData);
      seriesThird
        .name('Nutrition')
        .color('#4CAF50')
        .stroke(anychart.color.darken(this.sourceColor, 2));
      // set rendering settings
      seriesThird
        .rendering()
        // set point function to drawing
        .point(drawer)
        // set update point function to drawing, change the point shape when the state changes
        .updatePoint(drawer)
        // set shapes
        .shapes(shapes);

        var seriesFourth = chart.column(fourthSeriesData);
        seriesFourth
          .name('Overall Score')
          .color('#E74C3C')
          .stroke(anychart.color.darken(this.sourceColor, 3));
        // set rendering settings
        seriesFourth
          .rendering()
          // set point function to drawing
          .point(drawer)
          // set update point function to drawing, change the point shape when the state changes
          .updatePoint(drawer)
          // set shapes
          .shapes(shapes);

    // set titles for Y-axis
    chart.yAxis().title('% Progress');
    // set minimum for y-scale
    chart.yScale().minimum(0);
    // set tooltip prefix
    chart.tooltip().valuePostfix('%');
    // turn on legend
    chart.legend(true);
    // set container id for the chart
    chart.container('progress-container');
    // initiate chart drawing
    chart.draw();
  });

  function drawer() {
    // if missing (not correct data), then skipping this point drawing
    if (this.missing) {
      return;
    }

    // get shapes group
    var shapes = this.shapes || this.getShapesGroup(this.pointState);
    // calculate the left value of the x-axis
    var leftX = this.x - this.pointWidth / 2;
    // calculate the right value of the x-axis
    var rightX = leftX + this.pointWidth;
    // calculate the half of point width
    var rx = this.pointWidth / 2;

    shapes.path
      // resets all 'line' operations
      .clear()
      // draw column with rounded edges
      .moveTo(leftX, this.zero)
      .lineTo(leftX, this.value + rx)
      .circularArc(leftX + rx, this.value + rx, rx, rx, 180, 180)
      .lineTo(rightX, this.zero)
      // close by connecting the last point with the first straight line
      .close();
  }