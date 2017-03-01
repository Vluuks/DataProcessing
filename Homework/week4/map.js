/* Renske Talsma
	10896503
	
*/

/* Global stuff */
var colors = [ "#ffffb2", "#fed976", "#feb24c", "#fd8d3c",  "#fc4e2a", "#e31a1c", "#b10026" ];

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


function theFantasticBeautifulAmazingMap(dataDictionary){

	console.log(document.getElementById('container'));

	var map = new Datamap({
		
		element: document.getElementById('container'),
		
		geographyConfig: {
            popupTemplate: function(geo, data) {
                return ['<div class="hoverinfo"><strong>',
                        'Threatened plant species in ' + geo.properties.name,
                        ': ' + data.Amount,
                        '</strong></div>'].join('');
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


function makeRGBA(anInt){
		return "rgba(250, 60, 20," + (anInt/100) + ")"
}


function mapDataToCountryCode(unmappedData){
	
	dataDictionary = {};
	
	// Create function to map colors to data
	var paletteScale = d3.scale.log()
            .domain([0.1,1800]) // TODO MAGIC NUMBERS
            .range([1, 100]);
	
	for (var i =0; i < unmappedData.length; i++){
		
		var key = unmappedData[i]['Country Code'];
		var plantAmount = unmappedData[i]['Amount'];
		
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
}