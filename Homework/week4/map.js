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


// function theMap(){

		// var map = new Datamap({
		
		// element: document.getElementById('container'),
		// defaultFill: 'rgba(23,48,210,0.9)',
		// geographyConfig: {
            // highlightOnHover: true,
            // popupOnHover: true
        // }
		// data:{
			
		// }
		
	// });
	
	
// }


function mapDataToCountryCode(unmappedData){
	
	dataDictionary = {};
	
	for (var i =0; i < unmappedData.length; i++){
		
		var key = unmappedData[i]['Country Code'];
		unmappedData[i]['fillKey'] = "TEST";
		dataDictionary[key] = unmappedData[i];
	}
	
	console.log(dataDictionary);
}