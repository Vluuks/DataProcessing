getJSONfile(splitData);
// duizend ton = 1 miljoen kilo

function getJSONfile(callback){
    d3.json("./bodemgebruik.json", function(rawData) {
        callback(rawData);
    });
}

/* Separate first 12 entries (totals) from the rest of the data */
function splitData(data){
	
	console.log("cb");
	var summaryData = data.slice(0, 8);
	var provincieData = data.slice(8, data.length);
	console.log(summaryData);
	console.log(provincieData);
	
	// Continue with the provincieData
	constructChart(provincieData);
}


function getXData(data){
	
	var xAxisData = [];
	
	for(var i = 0; i < data.length; i++){
			xAxisData.append(data[i].regio);
	}
	
	return xAxisData;
}


function constructChart(data){
	
    // Define width and height of the SVG and margins
    var margin = {top: 20, right: 40, bottom: 60, left: 40},
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

	// Find chart and set properties
	var svg = d3.select(".chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
	// Create a scaling function for X and Y
    var scalingX = d3.scaleBand()
		.rangeRound([0, width])
		.paddingInner(0.05),
		.align(0.1);
	
	var scalingY = d3.scaleLinear()
		.rangeRound([height, 0];
	
	// Different colors for the different bars
	var barColors = d3.scaleOrdinal()
		.range(["#000000", "#747d8c", "#993710", "#cae216", "#a35b99", "#f4bc77", "#4c7a3a", "#77e1f4"]);
	var xData = getXData(data);
		
	barColors.domain(d3.keys(data[0]).filter(function(key) { return key !== "Regio"; }));

	var xAxis = d3.svg.axis()
		.scale(scalingX)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(scalingY)
		.orient("left")
		.tickFormat(d3.format(".2s"));
		

    
}