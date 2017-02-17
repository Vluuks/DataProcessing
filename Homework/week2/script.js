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

/* CONSTANTS & GLOBALS */
const VERTICAL_PADDING = 70;
const HORIZONTAL_PADDING =20;
const DAY_IN_MILLISECONDS = 86400000;
var graphCanvas = {};

initCanvas();
getRawData(processData);


/* DATA RETRIEVAL & INITIALIZATION */

/* Function that initalizes the canvas and creates an object that holds the properties of the canvas, 
so that they will be globally accessible by other functions as well. */
function initCanvas(){
    
	// Properties of the main canvas
    var canvas = document.getElementById('mycanvas');
	graphCanvas.canvas = canvas;
    graphCanvas.context = canvas.getContext('2d');
    graphCanvas.width  = canvas.width;
    graphCanvas.height = canvas.height;
    
	// Properties of the data
	graphCanvas.domain = undefined;
    graphCanvas.range = undefined;
    graphCanvas.zeroY = undefined;
	graphCanvas.dataArray = [];
	graphCanvas.intervals = [];
    graphCanvas.intervalsY = [];
	graphCanvas.dataPoints = [];
	graphCanvas.dataLength = 0;
	graphCanvas.avgMonth = new Array(12);
	graphCanvas.avgYear = 0;
	graphCanvas.minMaxYear = [];
	graphCanvas.daysInMonth = [32, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	// Properties of the interactive overlay canvas
	var canvasInteraction = document.getElementById('interactioncanvas');
	graphCanvas.canvasInteraction = canvasInteraction;
    graphCanvas.contextInteraction = canvasInteraction.getContext('2d');
    graphCanvas.widthInteraction  = canvasInteraction.width;
    graphCanvas.heightInteraction = canvasInteraction.height;
	
}


/* Requests raw data file. */
function getRawData(callback){
	
	$.ajax({
	type: "GET",
	async: true,
	url: "./data.txt",
	cache: true,
	dataType: 'text',
	
		success: function (rawData){
			callback(rawData);
		},
		error: function(){
			alert("Could not retrieve the data.");
		},
		complete: function(rawData){
			
		}    
	});		
}


/* After the data has been retrieved, store it in the global object and pass it on
to other functions as necessary to calculate values. */
function processData(rawData){
	
	var dataArray = splitData(rawData);
	graphCanvas.dataArray = dataArray;
	graphCanvas.dataPoints = generateDataPoints(dataArray);
	calculateMonthlyAverage();
	
	// Handle visual elements of the graph
	drawOnCanvas(graphCanvas.dataPoints);
}


/* Splits the data from the raw txt file into an array. And calculates other
necessary values based on the data. These are stored in an associative array. */
function splitData(rawData){

	var dataArray = rawData.split(/\n/);
	
	// Separate data 
	for(var i = 0; i < dataArray.length; i++){
		
		var separateValues = dataArray[i].split(/,/);
		
		// Get the month number.
		separateValues[4] = separateValues[0].substr(4,2);
		
		// Transform date format to actual Date object.
		separateValues[0] = new Date(makeDate(separateValues[0]));
		
		// Transform temperature to Int format.
		separateValues[1] = parseInt(separateValues[1]);
        
        // Add time in milliseconds.
        separateValues[2] = separateValues[0].getTime();
        
		// Calculate the day based on the offset from the first day in milliseconds.
		if(i > 0)
            minimumTime = dataArray[0][2];
        else 
            minimumTime = separateValues[2];
        separateValues[3] = getDay(minimumTime, separateValues[2]);
        
		// Insert all new/split data back into array as sub-array.
		dataArray[i] = separateValues;

	}

    return dataArray;
	
}


/* Creates day offset for every data point, taking the first point as day 1. */
function getDay(minimumTime, dataPointTime){
   var timeOffset = dataPointTime - minimumTime;
   return (timeOffset / DAY_IN_MILLISECONDS) + 1;
    
}


/* Takes the date from the raw data and makes it suitable for the JS Date object. */
function makeDate(dateString){

	dateString = dateString.trim();
	return (dateString.substr(0,4) + "," + dateString.substr(4,2) + "," + dateString.substr(6,2));

}


/* Generates the datapoints using the provided transform function. */
function generateDataPoints(dataArray){
    
    // Generate transform function.
    var transformDataY = getDomainRange(dataArray);
    var transformDataX = createTransform([0,365], [0 + HORIZONTAL_PADDING, 800 - HORIZONTAL_PADDING]);
	
    // Add y value for intervals degrees to canvas object to display on y-axis.
    var temperatureIntervals = [-15, -10, -5, 0, 5, 10, 15, 20, 25, 30];
    graphCanvas.intervals = temperatureIntervals;
    
    for(var i = 0; i < temperatureIntervals.length; i++)
        graphCanvas.intervalsY[i] = transformDataY(temperatureIntervals[i] * 10);
   
    // Store transformed data points in array.
    dataPoints = [];
    for(var i = 0; i < dataArray.length; i++){
        
        var xyArray = [];
        xyArray[0] = transformDataX(Math.ceil(dataArray[i][3]));
        xyArray[1] = transformDataY(dataArray[i][1]);		
        dataPoints[i]= xyArray;
		
    }
    
	// Store length so we do not have to ask for it every time and return data.
	graphCanvas.dataLength = dataPoints.length;
    return dataPoints;
    
}


/* Calculates the average monthly temperature and puts it back into an array.
The average temperature will be displayed on the x-axis and used to calculate
the standard deviation of the temperatures per day in relation to their month. */
function calculateMonthlyAverage(){

    var offset = 0;
	for(var i = 0; i < graphCanvas.avgMonth.length; i++){

		var monthlyTotal = 0;
		var offsetLeft = 0;

		// Loop over all the data and add to total to calculate average.
		for(var j = 0 + offset; j < graphCanvas.dataLength; j++){
			
			// If the data point matches the month that is being calculated.
			if(graphCanvas.dataArray[j][4] == i + 1)
				monthlyTotal += graphCanvas.dataArray[j][1];
		}

        // Calculate offset to not loop over beginning again.
        offset += graphCanvas.daysInMonth[i];
        
		// Calculate and store average.
		graphCanvas.avgMonth[i] = ((monthlyTotal/graphCanvas.daysInMonth[i])/10).toFixed(1);
	}
}


/* DATA TRANSFORMATION */

/* Determines domain and range for the given data set. Also calculates
the total average since it's looping over all the data anyway. Math.max/min is not used 
because the data is in an associative array so we cannot directly ask for the max or min. */
function getDomainRange(dataArray){
    
    // Calculate, total minimum and maxmimum value.
    var max = 0;
    var min = 0;
	var total = 0;
    
    for(var i = 0; i < dataArray.length; i++){
        
        if(dataArray[i][1] < min)
            min = dataArray[i][1];
        if(dataArray[i][1] > max)
            max = dataArray[i][1];
		
		total += dataArray[i][1];
    }
    
	// Add values to global object.
	graphCanvas.avgYear = ((total/dataArray.length)/10).toFixed(1);
	graphCanvas.minMaxYear[0] = (min/10).toFixed(1);
	graphCanvas.minMaxYear[1] = (max/10).toFixed(1);
	
	// Determine domain. 
    var domain = [];
    domain[0] = min;
    domain[1] = max;

    // Determine range.
    var range = [];
    range[0] = graphCanvas.height - VERTICAL_PADDING;
    range[1] = 0 + VERTICAL_PADDING;
    
    graphCanvas.range = range;
    graphCanvas.domain = domain;
    
    // Create transform function with these values.
    return createTransform(domain, range);
    
}

/* Takes a given domain and ranges and prepares another function
to determine the relative x or y spot on the canvas for that value. */
function createTransform(domain, range){

    var domain_min = domain[0];
    var domain_max = domain[1];
    var range_min = range[0];
    var range_max = range[1];

    // Formulas to calculate the alpha and the beta.
   	var alpha = (range_max - range_min) / (domain_max - domain_min);
    var beta = range_max - alpha * domain_max;
    
    // Returns the function for the linear transformation (y= a * x + b).
    return function(x){
      return alpha * x + beta;
    }
}


/* VISUAL ASPECTS */

/* Draws on the canvas using the retrieved data, adding information to the x and y axis as well. 
Finally, apply the listener to listen for user actions and allow interactivity. */
function drawOnCanvas(dataPoints){
	
	// Graph title and global information.
	graphCanvas.context.font="11px Arial";
	graphCanvas.context.fillText("Average temperature over 366 days: " + graphCanvas.avgYear+ "\u2103" , 20, 20);
	graphCanvas.context.fillText("Min: " + graphCanvas.minMaxYear[0] + "\u2103" + " Max: " + graphCanvas.minMaxYear[1] + "\u2103", 20, 30);
	graphCanvas.context.fillText("Hover over a data point for details." , 20, 40);
	graphCanvas.context.closePath();
    
	// Add text to X axis.
    var monthNames = ["1 Jan", "1 Feb", "1 Mar", "1 Apr", "1 May", "1 Jun", "1 Jul", "1 Aug", "1 Sept", "1 Oct", "1 Nov", "1 Dec"];
	var transformDataMonth = createTransform([0,graphCanvas.dataLength], [0 + HORIZONTAL_PADDING, graphCanvas.width - HORIZONTAL_PADDING]);
	
	// Write every month and the average on the X axis, taking in account padding.
    for (var i = 0, offset = HORIZONTAL_PADDING; i < graphCanvas.daysInMonth.length; i++) {
		
        // If it's not the first month:
        if(i > 0)
            offset += (transformDataMonth(graphCanvas.daysInMonth[i]) - HORIZONTAL_PADDING);

		// Month name.
		graphCanvas.context.font="12px Arial";
		graphCanvas.context.fillText(monthNames[i], offset, graphCanvas.height - 18);
		
		// Average temperature.
		graphCanvas.context.font="10px Arial";
		graphCanvas.context.fillText("\u03BC" + graphCanvas.avgMonth[i] + "\u2103", offset, graphCanvas.height - 5);
		
    }
     
	 // Add temperature intervals to Y axis.
     for(var i = 0; i < graphCanvas.intervals.length; i++){
        graphCanvas.context.fillText(graphCanvas.intervals[i], 5, graphCanvas.intervalsY[i]);
         
		 // Add horizontal lines.
		graphCanvas.context.beginPath();
		graphCanvas.context.strokeStyle = 'rgba(0, 0, 0, 0.5)'; 
		graphCanvas.context.moveTo(HORIZONTAL_PADDING, graphCanvas.intervalsY[i]);
		graphCanvas.context.lineTo(graphCanvas.width, graphCanvas.intervalsY[i]);
		graphCanvas.context.stroke();
		
    }
	 
	// Create styles for graph lines.
	var gradient = graphCanvas.context.createLinearGradient(0,0,graphCanvas.width,0);
	gradient.addColorStop("0","blue");
	gradient.addColorStop("0.5","red");
	gradient.addColorStop("1.0","blue");
	graphCanvas.context.strokeStyle = gradient;
	graphCanvas.context.lineWidth = 1.5;
	
	// Draw the graph.
    graphCanvas.context.beginPath();
	graphCanvas.context.moveTo((dataPoints[0][0]), dataPoints[0][1]);
    for (var i = 1; i < graphCanvas.dataLength ; i++)
		graphCanvas.context.lineTo((dataPoints[i][0]),  dataPoints[i][1]);
	graphCanvas.context.stroke();
	
	// Only when all of this is done, set listener.
	graphCanvas.canvasInteraction.addEventListener('mousemove', function(event) {
	
        var mousePos = getMousePos(graphCanvas.canvasInteraction, event);
        compareMouseXYAgainstData(mousePos.x, mousePos.y);
	
	}, false);
	 
}


/* INTERACTIVITY */

/* Get the mouse position, used to determine how the graph should react. 
Tutorial: http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/*/
function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

/* Called when the mouse position changes to check if the user is (almost) pointing at a data point. */
function compareMouseXYAgainstData(mouseX, mouseY){
	
	for(var i = 0; i < graphCanvas.dataLength; i++){
		if((graphCanvas.dataPoints[i][0] - mouseX) < 1 && (graphCanvas.dataPoints[i][1] - mouseY) < 1){
			
			// Erase old line
			graphCanvas.contextInteraction.clearRect(0, 0, graphCanvas.widthInteraction, graphCanvas.heightInteraction);
			
			// Draw a small circle to better show where the point is located.
			graphCanvas.contextInteraction.beginPath();
			graphCanvas.contextInteraction.arc(graphCanvas.dataPoints[i][0], graphCanvas.dataPoints[i][1], 4, 0, 2 * Math.PI, false);
			graphCanvas.contextInteraction.fill();
			graphCanvas.contextInteraction.closePath();
			
			// Draw the line to make comparison against x-axis simpler.
			graphCanvas.contextInteraction.beginPath();
			graphCanvas.contextInteraction.moveTo(graphCanvas.dataPoints[i][0], graphCanvas.dataPoints[i][1]);
			graphCanvas.contextInteraction.lineTo(graphCanvas.dataPoints[i][0], graphCanvas.heightInteraction - 20);
			graphCanvas.contextInteraction.stroke();
			graphCanvas.contextInteraction.closePath();
			
			// Calculate information about the data point at the top of the graph.
			var temperature = (graphCanvas.dataArray[i][1] / 10);
			var monthIndex = graphCanvas.dataArray[i][4] - 1;	
			var stdDevMonth = (temperature - graphCanvas.avgMonth[monthIndex]).toFixed(2);
			var stdDevYear =  (temperature - graphCanvas.avgYear).toFixed(2); 
			
			// Display the data.
			graphCanvas.contextInteraction.fillText("Date: " + graphCanvas.dataArray[i][0].toString().substr(0,15), graphCanvas.widthInteraction - 200, 20);
			graphCanvas.contextInteraction.fillText("Temperature: " + temperature + "\u2103", graphCanvas.widthInteraction - 200, 30);
			graphCanvas.contextInteraction.fillText("\u03C3 Month: " + stdDevMonth + "\u2103", graphCanvas.widthInteraction - 200, 40);
			graphCanvas.contextInteraction.fillText("\u03C3 Year: " + stdDevYear + "\u2103", graphCanvas.widthInteraction - 200, 50);
			
		}
			
	}
	
}