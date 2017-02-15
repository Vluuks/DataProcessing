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
                      
var dataArray = getData();
var transformData = getDomainRange(dataArray);


// Voor elk datapunt, vraag de bijbehorende y op?
// Dit deel is nog niet echt duidelijk voor me
var y = transformData(40);
console.log("y test" + y);
			  
canvasTest();





function getDomainRange(dataArray){
    
    // Minimum and maximum value of x-axis (time in days)
    var domain = [];
    domain[0] = dataArray[0][3];
    domain[1] = dataArray[dataArray.length-1][3];
  
    console.log(domain);
  
    var range = [];
    range[0] = -100;
    range[1] = 100;
    
    console.log(range);
    
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
        
        // add time in milliseconds as well
        separateValues[2] = separateValues[0].getTime();
        
        // and get the day offset based on these milliseconds
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
    
   var DAY_IN_MILLISECONDS = 86400000;
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


function canvasTest(){
    
    var canvas = document.getElementById('mycanvas');
    var context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(100, 150);
    context.lineTo(450, 50);
    context.stroke();
      
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

    console.log(alpha);
    console.log(beta);
    
    // returns the function for the linear transformation (y= a * x + b)
    return function(x){
      return alpha * x + beta;
    }
}

