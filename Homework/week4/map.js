/* Renske Talsma
	10896503
	
*/

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
            highlightOnHover: true,
            popupOnHover: true
        },
		
		fills:{
			TEST: 'red',
			defaultFill: '#00446A' 
		},
		
		data: dataDictionary
		
	});
		
}


/* This function determines the fill key of an object based on the
total amount of endangered plants. The more plants, the darker the color. */
// function determineFillKey(){

// }

function mapDataToCountryCode(unmappedData){
	
	dataDictionary = {};
	
	for (var i =0; i < unmappedData.length; i++){
		
		var key = unmappedData[i]['Country Code'];
		unmappedData[i]['fillKey'] = "TEST";
		dataDictionary[key] = unmappedData[i];
	}
	
	console.log(dataDictionary);
	
	theFantasticBeautifulAmazingMap(dataDictionary);
}