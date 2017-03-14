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


class Character = {
      name: "",
      agonyResist: -1,
      profession: "",
      level: -1,
      ascendedArmor: -1,
      ascendedWeapons: -1,
      ascendedTrinkets: -1,
}

class Account = {
    
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
var account = new Account();


/* Wait until page is ready. */
$('document').ready(function(){
	console.log("page ready");
});


function showError(errorMessage){
    $('#error').text(errorMessage);
}


/* Check the given API and then start retrieving data if it has been verified. 
This function is invoked by pressing the button on the webpage and will not run on itself. */
function getUserApi(){

    // Check for basics
    var apiKey = $("#apiKey").value;
    
    if(apiKey == "" || apiKey == undefined)
    {
    	showError("Please do not omit the first field").
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


apiCheckCallback(apiKey){
    
    // make api global now that it has been verified
    verifiedApiKey = verifiedApi;
    
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