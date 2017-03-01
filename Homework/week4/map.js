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
            },
			highlightFillColor: '#D3D3D3',
			highlightBorderColor: '#C0C0C0',
			highlightBorderWidth: 4,
			highlightBorderOpacity: 1
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


function makeRGBA(anInt){
		return "rgba(250, 0, 50," + (anInt/100) + ")"
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
		
		console.log(+plantAmount);
		console.log(paletteScale(1000));
		
		// Check the amount because logarithmic scale cannot handle 0 value
		if(plantAmount == 0)
			unmappedData[i]['FillColor'] = makeRGBA(1);
		else{
			var fillColor = makeRGBA(parseInt(paletteScale(+plantAmount)));
			unmappedData[i]['fillColor'] = fillColor;
		}
		
		dataDictionary[key] = unmappedData[i];
	}
	
	console.log(dataDictionary);
	
	for( var key in dataDictionary)
		console.log(dataDictionary[key].Amount);
	
	theFantasticBeautifulAmazingMap(dataDictionary);
}