/* Renske Talsma
	10896503
	
*/

/* Global stuff */
//var colors = [ "#ffffb2", "#fed976", "#feb24c", "#fd8d3c",  "#fc4e2a", "#e31a1c", "#b10026" ];

/* Wait until page is ready. */
$('document').ready(function(){
	getJSONfile(mapDataToCountryCode);
});

/* Retrieves data from a given JSON file. */
function getJSONfile(callback){
    d3.json("./Data/data.json", function(rawData) {
        callback(rawData);
    });
}


function setColor(){
    
    //Check if something is selected
    // Default to red
    
    //Create function based on the selecteed color (akin to createtransform)
    
    // green rgb(63, 191, 63)
    // red rgba(250, 60, 20,
    // bluergb(14, 58, 103)
    // black  rgb(0, 0, 0)
    
    var r, g, b;
    
    // Return a function that creates the right color with the given alpha
    var createRGBA = function(anInt) { return "rgba(" +r "," + b  + "," + g + "," + (anInt/100) + ")" }; 
    
    
}



function theFantasticBeautifulAmazingMap(dataDictionary){

	console.log(document.getElementById('container'));

	var map = new Datamap({
		
		element: document.getElementById('container'),
		
		geographyConfig: {
            popupTemplate: function(geo, data) {
                return ['<div class="hoverinfo">',
                        'Threatened plant species in ' + geo.properties.name,
                        ': ' + data.Amount,
                        '</div>'].join('');
            },
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

function drawLegend(paletteScale){
	
	var ticks = [1, 5, 10, 20, 50, 100, 200, 400, 800, 1600];
	var tickColors = [];
	
	for(var i = 0; i < ticks.length; i ++)
		 tickColors[i] = makeRGBA(parseInt(paletteScale(ticks[i])));
	
	var legendScale = d3.scale.linear()
    .domain(ticks)
	.range(tickColors);
	
	var horizontalLegend = d3.svg.legend()
	
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



function makeRGBA(anInt){
		return "rgba(250, 60, 20," + (anInt/100) + ")"
}


function mapDataToCountryCode(unmappedData){
	
	dataDictionary = {};
	
	// Create function to map colors to data
	var paletteScale = d3.scale.log()
            .domain([0.1,1800]) // TODO MAGIC NUMBERS
            .range([1, 100]);
	
	var dictMax = 0;
	
	for (var i =0; i < unmappedData.length; i++){
		
		var key = unmappedData[i]['Country Code'];
		var plantAmount = unmappedData[i]['Amount'];
		
		if(plantAmount > dictMax)
			dictMax = plantAmount;
		
		// Check the amount because logarithmic scale cannot handle 0 value
		if(+plantAmount == 0)
			unmappedData[i]['fillColor'] = makeRGBA(15);
		else{
			var fillColor = makeRGBA(parseInt(paletteScale(+plantAmount)));
			unmappedData[i]['fillColor'] = fillColor;
		}
		
		dataDictionary[key] = unmappedData[i];
	}

	console.log(dataDictionary);
	theFantasticBeautifulAmazingMap(dataDictionary);
	drawLegend(paletteScale);
}