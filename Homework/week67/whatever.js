/* Renske Talsma
	10896503
	
	A complete clusterfuck
	
*/


// get api
// verify api
// get data in steps
// show data in steps
// ????
// profit

// how do i make a model class help
function Character() {
      this.name = "";
      this.agonyResist = -1;
      this.profession = "";
      this.level = -1;
      this.ascendedArmor = -1;
      this.ascendedWeapons = -1;
      this.ascendedTrinkets = -1;
}

var account = {
    
    apiKey: "",
    hoursPlayed: -1,
    characters: [],
    characterAmount: -1,
    fractalLevel: -1,
    fractalRelics: -1,
    fractalPristine: -1

    // if i have time
    // matrices
    // integrated matrices
    // fractal specific collections
    
}




/* Global things */
var verifiedApiKey = "";

// handle all global things by the global account variable if possible
// otherwise gonna be a huge clusterfuck
//var account = new Account();


/* Wait until page is ready. */
$('document').ready(function(){
	console.log("page ready");
});


function showError(errorMessage){
    $('#error').text(errorMessage);
}


function initCanvases(){
	// TODO
}


/* Check the given API and then start retrieving data if it has been verified. 
This function is invoked by pressing the button on the webpage and will not run on itself. */
function getUserApi(){

    // Check for basics
    var apiKey = $("#apiKey").val().trim();
	console.log(apiKey);
	apiKey = "F42B9440-82CB-0D4A-AA45-1594E292B1FB08137C88-69C5-4779-8740-43FA4C501EE0"
    
    if(apiKey == "" || apiKey == undefined)
    {
    	showError("Please do not omit the field");
    }
    else{
        
        if (/^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{20}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/.test(apiKey)){

			$.ajax({
			type: "GET",
			async: true,
			url: "https://api.guildwars2.com/v2/tokeninfo?access_token=" + apiKey,
			cache: false,
			dataType: 'text',
			
				success: function (){},
				error: function(){
                    showError("Could not retrieve data about API from the server.");
				},
				// Check if it's a valid key even if it passed regex
				complete: function(data){

					var apiResult = JSON.parse(data.responseText);
					console.log(apiResult);
					
					// If the key matches the expected format but is still invalid
					if(apiResult.text && (apiResult.text.equals("endpoint requires authentication") || apiResult.text.equals("invalid key")))
						showError("Your API key is not valid or is missing permissions.");
				
					// If the permissions array exists in JSON
					if(apiResult.permissions){
						
						var permissionCount = 0;
						for(var i = 0; i <apiResult.permissions.length; i++){
							
							// Check for the necessary permissions
							// Possible permissions can be found at https://wiki.guildwars2.com/wiki/API:2/tokeninfo
							switch(apiResult.permissions[i]){
								case "characters":
									permissionCount++;
									break;
								case "account":
									permissionCount++;
									break;
								case "builds":
									permissionCount++;
									break;
								case "progression":
									permissionCount++;
									break;
							}
						}
						
						console.log(permissionCount);
						
						// Check if permission requirements were met, if so, invoke callback function.
						if(permissionCount == 4)
							apiCheckCallback(apiKey);
						else
							showError("Your API key is missing permissions.");
					}
				}    
			});
		}
		// If API key didn't pass regex it can never be valid.
		else{
			showError("Your API key is not valid");
		}
        
    }

}


function apiCheckCallback(apiKey){
    
    // make api global now that it has been verified
    account.apiKey = apiKey;
	
	// Get account properties such as the name, characters etc.
	
	
	// Retrieve the fractal achievements and perform display cb.
	getFractalAchievements(apiKey, displayFractalAchievements);
	getCharacters(getGeneralCharacterInfo);
    
    // Figure out which things can be done simultaneously and which are callback dependent
    
    // 1
    // Look up characters -> look up gear per character -> calculate agony resist
    
    // Construct barchart of AR per character
    // Show class also
    // Make character object!!!
    
    
    // 2
    // Look up fractal achievements
    // Find indices taht correspond
    // Report status
    
    
    //3
    // Look up fractal dailies and status (perhaps this can be done in same time with the other achievements)
    
}

function getCharacters(callback){
 
    $.ajax({
		type: "GET",
		async: true,
		url: "https://api.guildwars2.com/v2/characters?access_token=" + account.apiKey,
		cache: false,
		dataType: 'text',
		
			success: function(){},
			error: function(){
                showError("Could not retrieve character data.");
            },
			complete: function(data){
						
				// convert json array to javascript array
				characterArray = JSON.parse(data.responseText);
				console.log(characterArray);
				console.log(characterArray.length);
				
				// start fetching equipment
                callback(characterArray);
			}    
	});
    
}

function getGeneralCharacterInfo(characterArray){
    
    console.log("getequips entered");
    
    var counter = 0;
    // ??? ?? ?? AAAAAAH
    
    
    for (let i = 0; i < characterArray.length; i++) { //TODO
        (function(i){
        
            $.ajax({
                type: "GET",
                async: true,
                url: "https://api.guildwars2.com/v2/characters/" + characterArray[i] + "?access_token=" + account.apiKey,
                cache: false,
                dataType: 'text',               
                success: function(){},
                error: function(){},
                
                // wait until request is done
                complete: function(data){
                            
                    // convert json data to javascript
                    var characterobject = JSON.parse(data.responseText);
                    console.log(i)
                    console.log(characterobject);
                    
                    // store character info and character age in dictionary
                    // charinfodictionary[a_characterArray[l]] = characterobject.level + " " + characterobject.race; 
                    // classdictionary[a_characterArray[l]] = characterobject.profession;
                    // agedictionary[a_characterArray[l]] = (characterobject.age / 3600).toFixed(0);
                    if(i == characterArray.length-1)
                        console.log("loop test" + i);
                        
                }
            });
        
        })(i);
    }
}


function getCharacterEquipment(characterArray){
    
    
    
}



function getFractalAchievements(apiKey, callback){
	
	// Get the array of API 
	$.ajax({
	type: "GET",
	async: true,
	url: "https://api.guildwars2.com/v2/account/achievements?access_token=" + apiKey,
	cache: false,
	dataType: 'text',
	
		success: function(){
		},
		error: function(){
			showError("Could not retrieve information about achievements.");
		},
		complete: function(data){
			
			var achievementArray = JSON.parse(data.responseText);
			var fractalAchievementArray = new Array(4);
			
			// Find the fractal achievements in the array (they do not have a fixed index, unfortunately).
			for(var i = 0, length = achievementArray.length; i < length; i++){
				switch(achievementArray[i].id){
					
					// Initiate
					case 2965:
						fractalAchievementArray[0] = achievementArray[i].bits;
						break;
						
					// Adept
					case 2894:
						fractalAchievementArray[1] = achievementArray[i].bits;
						break;
						
					// Expert
					case 2217:
						fractalAchievementArray[2] = achievementArray[i].bits;
						break;
					
					// Master
					case 2415:
						fractalAchievementArray[3] = achievementArray[i].bits;
						break;
				} 
			}
			
			console.log(fractalAchievementArray);
			callback(fractalAchievementArray);
		}
	});
}

function displayFractalAchievements(dataArray){
	
	console.log(dataArray);
	
	// Turn the array into a more useful/uniform data format.
	for(var i = 0; i < dataArray.length; i++){
		
		console.log(dataArray[i]);
		
		// Initialize an array full of true. 
		achievementBoolArray = new Array(25);
		for(var j = 0; j < achievementBoolArray.length; j++)
			achievementBoolArray[j] = true;
		
		// Set incomplete achievements to false for indices in subarrays.
		for (var k = 0; k < dataArray[i].length; k++){
			achievementBoolArray[dataArray[i][k]] = false;
		}
		
		dataArray[i] = achievementBoolArray;
	
	}
	
	console.log(dataArray);
	console.log("callback hoi");
	
	// Now I can do something with the data!
}