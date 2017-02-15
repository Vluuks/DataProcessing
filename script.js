/*

$$$$$$$\                                $$\                 
$$  __$$\                               $$ |                
$$ |  $$ | $$$$$$\  $$$$$$$\   $$$$$$$\ $$ |  $$\  $$$$$$\  
$$$$$$$  |$$  __$$\ $$  __$$\ $$  _____|$$ | $$  |$$  __$$\ 
$$  __$$< $$$$$$$$ |$$ |  $$ |\$$$$$$\  $$$$$$  / $$$$$$$$ |
$$ |  $$ |$$   ____|$$ |  $$ | \____$$\ $$  _$$<  $$   ____|
$$ |  $$ |\$$$$$$$\ $$ |  $$ |$$$$$$$  |$$ | \$$\ \$$$$$$$\ 
\__|  \__| \_______|\__|  \__|\_______/ \__|  \__| \_______|
                                                            
Renske Talsma
10896503
		
*/                                                             

/* Initialize canvas */
const VERTICAL_PADDING = 70;
const HORIZONTAL_PADDING =20;
const DAY_IN_MILLISECONDS = 86400000;

var graphCanvas = {};
initCanvas();

/* Get data and make points */
var dataArray = getData();
var dataPoints = generateDataPoints(dataArray);

/* Draw graph */
canvasTest(dataPoints);





/* Function that initalizes the canvas and creates an object that holds the properties of the canvas, 
so that they will be globally accessible by other functions as well. */
function initCanvas(){
    
    var canvas = document.getElementById('mycanvas');
    graphCanvas.context = canvas.getContext('2d');
    graphCanvas.width  = canvas.width;
    graphCanvas.height = canvas.height;
    graphCanvas.domain = undefined;
    graphCanvas.range = undefined;
    graphCanvas.zeroY = undefined;
    graphCanvas.intervals = [];
    graphCanvas.intervalsY = [];
    
}


function getDomainRange(dataArray){
    
    // Determine domain. Minimum and maximum value of temperature
	// Since it's an associative array we cannot use math.max,
	// because we need to index in the array to compare
    var domain = [];
    
    var max = 0;
    var min = 0;
    
    for(var i = 0; i < dataArray.length; i++){
        
        if(dataArray[i][1] < min)
            min = dataArray[i][1];
        if(dataArray[i][1] > max)
            max = dataArray[i][1];
    }
    
    domain[0] = min;
    domain[1] = max;

    // Determine range
    var range = [];
    range[0] = graphCanvas.height - VERTICAL_PADDING;
    range[1] = 0 + VERTICAL_PADDING;
    
    graphCanvas.range = range;
    graphCanvas.domain = domain;
    
    // Create transform function with these values
    return createTransform(domain, range);
    
}


/* Retrieves data from the HTML element */
function getData(){

	// Get data from element
	var rawData = document.getElementById("rawdata").value;	
	var dataArray = rawData.split(/\n/);
	
	// Separate date from temperature
	for(var i = 0; i < dataArray.length; i++){
		
		var separateValues = dataArray[i].split(/,/);
		separateValues[0] = new Date(makeDate(separateValues[0]));
		separateValues[1] = parseInt(separateValues[1]);
        
        // Add time in milliseconds as well
        separateValues[2] = separateValues[0].getTime();
        
        // And get the day offset based on these milliseconds
        if(i > 0)
            minimumTime = dataArray[0][2];
        else 
            minimumTime = separateValues[2];
        
        separateValues[3] = getDay(minimumTime, separateValues[2]);
        
		// Insert back into array as sub-array
		dataArray[i] = separateValues;

	}
    
    // the full array with all data
	console.log("after for loop" + dataArray);
    
    return dataArray;
	
}


/* Function that creates day offset for every data point, taking the first point as day 1. */
function getDay(minimumTime, dataPointTime){
   var timeOffset = dataPointTime - minimumTime;
   return (timeOffset / DAY_IN_MILLISECONDS) + 1;
    
}


/* A small function that takes the date from the raw data and makes it suitable for the JS Date object. */
function makeDate(dateString){

	// Trim whitespace
	dateString = dateString.trim();
		
	// 20160101, year is 0 to 3, month is 4 and 5, day is 6 and 7
	return (dateString.substr(0,4) + "," + dateString.substr(4,2) + "," + dateString.substr(6,2));

}


/* Function that generates the datapoints using the provided transform function. */
function generateDataPoints(dataArray){
    
    // Generate transform function
    var transformDataY = getDomainRange(dataArray);
    var transformDataX = createTransform([0,365], [0 + HORIZONTAL_PADDING, 800 - HORIZONTAL_PADDING]);
	
    // Add Y value for intervals degrees to canvas object to display on Y-axis
    var temperatureIntervals = [-15, -10, -5, 0, 5, 10, 15, 20, 25, 30];
    graphCanvas.intervals = temperatureIntervals;
    
    for(var i = 0; i < temperatureIntervals.length; i++)
        graphCanvas.intervalsY[i] = transformDataY(temperatureIntervals[i] * 10);
   
    // Store transformed data points in array
    dataPoints = [];
    for(var i = 0; i < dataArray.length; i++){
        
        var xyArray = [];
        xyArray[0] = transformDataX(Math.ceil(dataArray[i][3]));
        xyArray[1] = transformDataY(dataArray[i][1]);
        
		console.log(xyArray[0]);
		console.log(xyArray[1]);
		
        dataPoints[i]= xyArray;
		
    }
     
    return dataPoints;
    
}




/* bullshit */
function canvasTest(dataPoints){
    
    // Steps on X axis
    var stepsX = dataPoints.length;
    var stepSizeX = graphCanvas.width / stepsX;
        
    // Draw the graph
    graphCanvas.context.beginPath();
	graphCanvas.context.moveTo((dataPoints[0][0] * stepSizeX), dataPoints[0][1]);
    for (var i = 1; i < stepsX ; i++)
		graphCanvas.context.lineTo((dataPoints[i][0] * stepSizeX),  dataPoints[i][1]);

	graphCanvas.context.stroke();

    
   // Add text to X axis
    var daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var monthNames = ["1 Jan", "1 Feb", "1 Mar", "1 Apr", "1 May", "1 Jun", "1 Jul", "1 Aug", "1 Sept", "1 Oct", "1 Nov", "1 Dec"];
    
    for (var i = 0, offset = HORIZONTAL_PADDING; i <= daysInMonth.length; i++) {
        
        // If it's not the first month
        if(i > 0)
            offset = daysInMonth[i-1] * stepSizeX * i;

		graphCanvas.context.fillText(monthNames[i], offset, graphCanvas.height-10);
    }
     
     // Calculate distance between each interval on Y axis
     var stepSizeY = graphCanvas.intervalsY[0] - graphCanvas.intervalsY[1];
     console.log("size" + stepSizeY);
     
	 // Add temperature intervals to y axis
     for(var i = 0; i < graphCanvas.intervals.length; i++){
        graphCanvas.context.fillText(graphCanvas.intervals[i], 5, graphCanvas.intervalsY[i]);
         
		 // Add horizontal lines
		graphCanvas.context.beginPath();
		graphCanvas.context.moveTo(HORIZONTAL_PADDING, graphCanvas.intervalsY[i]);
		graphCanvas.context.lineTo(graphCanvas.width, graphCanvas.intervalsY[i]);
		graphCanvas.context.stroke();
     }
	 
}


function createTransform(domain, range){
	// domain is a two-element array of the data bounds [domain_min, domain_max]
	// range is a two-element array of the screen bounds [range_min, range_max]
	// this gives you two equations to solve:
	// range_min = alpha * domain_min + beta
	// range_max = alpha * domain_max + beta
    // a solution would be:

    var domain_min = domain[0];
    var domain_max = domain[1];
    var range_min = range[0];
    var range_max = range[1];

    // formulas to calculate the alpha and the beta
   	var alpha = (range_max - range_min) / (domain_max - domain_min);
    var beta = range_max - alpha * domain_max;

    console.log("A" + alpha);
    console.log("B" + beta);
    
    // returns the function for the linear transformation (y= a * x + b)
    return function(x){
      return alpha * x + beta;
    }
}

