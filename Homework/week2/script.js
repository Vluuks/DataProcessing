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
                      
getData();					  

/* Retrieves data from the HTML element */
function getData(){

	// Get data from element
	var rawData = document.getElementById("rawdata").value;	
	var dataArray = rawData.split(/\n/);
	console.log(dataArray);
	
	// Separate date from temperature
	for(var i = 0; i < dataArray.length; i++){
		
		var separateValues = dataArray[i].split(/,/);
		console.log(separateValues[0]);
		console.log(separateValues[1]);
		
		var string = separateValues[0];
		
		makeDate(string);
		
		separateValues[0] = new Date(makeDate(separateValues[0]));
		separateValues[1] = parseInt(separateValues[1]);
		
		// Insert back into array as sub-array
		dataArray[i] = separateValues;

	}
	
	console.log("after for loop" + dataArray);
	
}

/* A small function that takes the date from the raw data and makes it suitable for the JS Date object. */
function makeDate(dateString){

	// Trim whitespace
	dateString = dateString.trim();
		
	// 20160101, year is 0 to 3, month is 4 and 5, day is 6 and 7
	return (dateString.substr(0,4) + "," + dateString.substr(4,2) + "," + dateString.substr(6,2));

}