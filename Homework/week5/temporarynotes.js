
function callbackInit(error, data2015, data2016){

	if(error)
		throw error;
	
	console.log(data2015);
	
	// Store globally
	dataDict[0] = data2016;
	dataDict[1] = data2016;

	setData();
	
}



function setData(){
	
	var dataYear = $('#yearChoice').val();
	var dataDomain = [];

	switch(dataYear){
		case "2015":
			data = dataDict[0];
			dataDomain =  [new Date(2015,1,1), new Date(2015,11,31)];
			break;
		case "2016":
			data = dataDict[1];
			dataDomain =  [new Date(2016,1,1), new Date(2016,11,31)];
			break;
		default:
			data = dataDict[0];
			dataDomain =  [new Date(2015,1,1), new Date(2015,11,31)];
			break;
	}
    
	console.log(dataDict);
	console.log(data);
	
	// Initialize canvas with the chosen data.
	initCanvas(data, dataDomain)
}