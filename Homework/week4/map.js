/* Renske Talsma
	10896503
	
*/

/* Global stuff */
var colors = [ "#ffffb2", "#fed976", "#feb24c", "#fd8d3c",  "#fc4e2a", "#e31a1c", "#b10026" ];

/* Wait until page is ready. */
$('document').ready(function(){
	getJSONfile(doSomething);
});

/* Retrieves data from a given JSON file. */
function getJSONfile(callback){
    d3.json("./Data/data.json", function(rawData) {
        callback(rawData);
    });
}

function doSomething(data){
	console.log(data);
	mapDataToCountryCode(data);
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
            }
        },
		
		fills:{
			a: colors[0],
			b: colors[1],
			c: colors[2],
			d: colors[3],
			e: colors[4],
			f: colors[5],
			g: colors[6],
			defaultFill: '#999999' 
		},
		
		data: dataDictionary
		
	});
		
}


/* This function determines the fill key of an object based on the
total amount of endangered plants. The more plants, the darker the color. */
function determineFillKey(amount){
		
		console.log(amount);
		console.log(0 < +amount <=10);
		console.log(0 < amount && amount  <=10);
		
		if (amount == 0)
			return "a";
		else if(0 < amount && amount <= 10)
			return "b";
		else if(10 < amount && amount  <= 20)
			return "c";
		else if(20 < amount && amount  <= 30)
			return "d";
		else if(30 < amount && amount  <= 40)
			return "e";
		else if(40 < amount && amount  <= 50)
			return "f";
		else if(amount >= 50)
			return "g";			

}





function mapDataToCountryCode(unmappedData){
	
	dataDictionary = {};
	
	// Create function to map colors to data
	var paletteScale = d3.scale.linear()
            .domain([0,2000]) // TODO MAGIC NUMBERS
            .range(["#fee391","#b10026"])
	
	for (var i =0; i < unmappedData.length; i++){
		
		var key = unmappedData[i]['Country Code'];
		var plantAmount = unmappedData[i]['Amount'];
		unmappedData[i]['fillColor'] = paletteScale(+plantAmount);
		dataDictionary[key] = unmappedData[i];
	}
	
	console.log(dataDictionary);
	
	for( var key in dataDictionary)
		console.log(dataDictionary[key].Amount);
	
	theFantasticBeautifulAmazingMap(dataDictionary);
}