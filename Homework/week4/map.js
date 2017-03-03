/* Renske Talsma
	10896503
	
	This script renders a map with data about threatened plant species. 
	The map contains a legend as well. 
	
*/

/* Global RGBA function accessible by all methods. */
var createRGBA;
var globalRawData;


/* Wait until page is ready. */
$('document').ready(function(){
	getJSONfile(setColor);
});


/* Retrieves data from a given JSON file. */
function getJSONfile(callback){
    d3.json("./Data/data.json", function(rawData) {		
		globalRawData = rawData;
        callback();
    });
}


/* Sets the color of the map. */
function setColor(){
	
	// Check if the map is already drawn and if so, deletes it first.
	var mapSVG = $(".datamap");
	if (mapSVG !== undefined)
		mapSVG.remove();
   
    // Check if something is selected and use red as a default.
	var chosenColor = $('#colorChoice').val();
	var RGB;
    
	switch(chosenColor){		
		case "red":
			RGB = "118, 29, 29";
			break;
		case "green":
			RGB = "18, 83, 18";
			break;
		case "blue":
			RGB = "14, 58, 103";
			break;			
		default:
			RGB = "118, 29, 29";
	}
	
    // Create the function based on the selected color.
	createRGBA = function(anInt){ 
		return "rgba(" + RGB + "," + (anInt/100) + ")"; 
	}; 
   
	// Pass data on to map it.
	mapDataToCountryCode(globalRawData);
}


/* Maps the data to the country code, so that it's in line with datamap convetions. 
Also adds fillcolors based on color selected earlier. */
function mapDataToCountryCode(unmappedData){
	
	dataDictionary = {};
	
	// Create function to map colors to data logarithmically.
	var paletteScale = d3.scale.log()
            .domain([0.1,1800]) // TODO MAGIC NUMBERS
            .range([1, 100]);
	
	// Loop over objects and remap in dictionary.
	for (var i =0; i < unmappedData.length; i++){
		
		var key = unmappedData[i]['Country Code'];
		var plantAmount = unmappedData[i]['Amount'];
		
		// Check the amount because logarithmic scale cannot handle 0 value.
		if(+plantAmount == 0)
			unmappedData[i]['fillColor'] = createRGBA(15);
		else{
			var fillColor = createRGBA(parseInt(paletteScale(+plantAmount)));
			unmappedData[i]['fillColor'] = fillColor;
		}
		
		// Insert back into dictionary.
		dataDictionary[key] = unmappedData[i];
	}

	// Draw both the map and the legend. 
	createMap(dataDictionary);
	drawLegend(paletteScale);
}


/* Creates the map and map properties. */
function createMap(dataDictionary){

	var map = new Datamap({
		element: document.getElementById('container'),
		
		// Set up the tooltip. 
		geographyConfig: {
            popupTemplate: function(geo, data) {
                return ['<div class="hoverinfo">', geo.properties.name,
                        ': ' + data.Amount,
                        '</div>'].join('');
            },
			
			// Set onhover style attributes.
			highlightFillColor: "rgb(211, 211, 211)",
			highlightBorderColor: "rgb(192, 192, 192)",
			highlightBorderWidth: 4,
			highlightBorderOpacity: 1
        },
		
		fills:{
			defaultFill: '#999999' 
		},
		
		data: dataDictionary
		
	});
}

/* Draws a legend for the map using the given ticks and colors specified by the user. */
function drawLegend(paletteScale){
	
	var ticks = [1, 5, 10, 20, 50, 100, 200, 400, 800, 1600];
	var tickColors = [];
	
	// Parse tick value to color. 
	for(var i = 0; i < ticks.length; i ++)
		 tickColors[i] = createRGBA(parseInt(paletteScale(ticks[i])));
	
	// Scale ticks to the legend. 
	var legendScale = d3.scale.linear()
		.domain(ticks)
		.range(tickColors);	
	var horizontalLegend = d3.svg.legend()
	
	// Set legend properties. 
	horizontalLegend.units("")
		.cellWidth(60)
		.cellHeight(20)
		.inputScale(legendScale)
		.cellStepping(10);
	d3.select("svg")
		.append("g")
			.attr("transform", "translate(50,70)")
			.attr("class", "legend")
			.call(horizontalLegend);
}