/* Renske Talsma
	10896503
	
	A complete clusterfuck
	
*/

/* Model "class" used to store data about characters. Initializes with default
values and is further filled in as API requests are completed and data retrieved. */
function Character() {
      this.name = "";
      this.race = "";
      this.agonyResist = 0;
      this.profession = "";
      this.level = -1;
      this.equipment = [];
      this.equipmentRarity = [];
      this.equipmentSunburst = undefined;
}

/* A global object used to store all the information pertaining to the account
that is currently using the visualization. */
var account = {
    
    apiKey: "",
    hoursPlayed: -1,
    characters: [],
    characterAmount: -1,
    fractalLevel: -1,
    fractalRelics: -1,
    fractalPristine: -1,
    characterDictionary: {}

    // if i have time
    // matrices
    // integrated matrices
    // fractal specific collections
    
}

var barChartCanvas = {
	margin: {}
}

var sunBurstCanvas = {
	margin: {}
}

/* Wait until page is ready. */
$('document').ready(function(){
	console.log("page ready");
});

/* Small function that takes a string and shows it in the error span on top of the page. */
function showError(errorMessage){
    $('#error').text(errorMessage);
}

/* Initializes the different svg canvases used by this visualization. */
function initCanvases(){
	
	// barChartCanvas.margin = {top: 100, right: 180, bottom: 100, left: 100};
    // var width = 1200 - barChartCanvas.margin.left - barChartCanvas.margin.right,
        // height = 840 - barChartCanvas.margin.top - barChartCanvas.margin.bottom;

    // var svg = d3.select("body")
      // .append("svg")
      // .attr("width", width + barChartCanvas.margin.left + barChartCanvas.margin.right)
      // .attr("height", height + barChartCanvas.margin.top + barChartCanvas.margin.bottom)
      // .append("g")
      // .attr("transform", "translate(" + barChartCanvas.margin.left + "," + barChartCanvas.margin.top + ")");
	  
	// sunBurstCanvas.margin = {top: 100, right: 180, bottom: 100, left: 100};
    // var width = 1200 - sunBurstCanvas.margin.left - sunBurstCanvas.margin.right,
        // height = 840 - sunBurstCanvas.margin.top - sunBurstCanvas.margin.bottom;

    // var svg = d3.select("body")
      // .append("svg")
      // .attr("width", width + sunBurstCanvas.margin.left + sunBurstCanvas.margin.right)
      // .attr("height", height + sunBurstCanvas.margin.top + sunBurstCanvas.margin.bottom)
      // .append("g")
      // .attr("transform", "translate(" + sunBurstCanvas.margin.left + "," + sunBurstCanvas.margin.top + ")");
}

/* Check the given API and then start retrieving data if it has been verified. 
This function is invoked by pressing the button on the webpage. */
function getUserApi(){

    // Check for basics
    var apiKey = $("#apiKey").val().trim();

	apiKey = "F42B9440-82CB-0D4A-AA45-1594E292B1FB08137C88-69C5-4779-8740-43FA4C501EE0"
	//apiKey = "8517F046-B25D-BF4B-AC3A-1F001F87E5902EAC6607-483A-434F-AB8B-DB65718FF374"
	//apiKey = "ikoh";
    
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

/* Called after the API key has been verified and handles the subsequent calls to other functions
which retrieve more information from the API. */
function apiCheckCallback(apiKey){
    
    // Make api global now that it has been verified.
    account.apiKey = apiKey;
	
	// Get characters and in turn character equipment.
    getCharacters(getGeneralCharacterInfo);
    
	// Retrieve the fractal achievements and perform display cb.
	//getFractalAchievements(displayFractalAchievements);

    
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

/* This function retrieves a list of the characters on the account from the API and then
calls the callback which will retrieve additional info based on the character names. */
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
						
				// Convert json array to javascript.
				characterArray = JSON.parse(data.responseText);
				console.log(characterArray);
				// console.log(characterArray.length);
                
                account.characters = characterArray.sort();
                account.characterAmount = characterArray.length;
				
				// Fetch general info and equipment.
                callback();
			}    
	}); 
}

/* Retrieves information about a character based on the name of the character and
stores the information in a character object which will be globally accessible by the
other functions in the script. */
function getGeneralCharacterInfo(){
  
    var characterArray = account.characters;
    var counter = 0;
    // account.characterAmount
    for (let i = 0; i < account.characterAmount; i++) { 
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
                    var characterObject = JSON.parse(data.responseText);
                    counter++;
                    // console.log("loop index " + i);
                    // console.log("counter" + counter);
                    // console.log(characterObject);
                    
                    // Add properties to the object
                    var character = new Character();
                    character.race = characterObject.race;
                    character.level = characterObject.level;
                    character.equipment = characterObject.equipment;
                    character.profession = characterObject.profession;
                    character.hoursPlayed = (characterObject.age / 3600).toFixed(0);
                    account.characterDictionary[characterObject.name] = character;
                    
                    if(counter == characterArray.length){
                        console.log("CALLBACKS WTF NEE HELP loop test" + counter);   
                        fetchEquipment();
                    }
                }
            });
        })(i);
    }
}

/* This function extracts the equipment array from the dictionary of characters and their info
and checks for every piece what type it is and whether it is of ascended (best in slot) rarity. Because
this information is nested within the API, multiple API calls are necessary, we need to retrieve information
about the item using the item ID. This needs to be done with iterations because items are not always
present on a character (ie not all equipment slots are filled) so there are no fixed indices to use.

For every item we look up the rarity and the type and this is stored in an object which in turn is stored
in the dictionary with the character name as a key. This dictionary is globally accessible and will, after
the callback, be available for use by the visualizations. */
function fetchEquipment(){
   
   // Iterate over the characters in the dictionary and access equipment array for each.
    for (let character in account.characterDictionary) {
        (function(character){
            if (account.characterDictionary.hasOwnProperty(character)) {
                
                var equipmentArray = account.characterDictionary[character].equipment;
                var agonyResistCounter = 0;
                var gearCheckCounter = 0;
                
                // Loop over the equipment array and perform check on each piece that is present.
                for(let i = 0; i < equipmentArray.length; i++){
                    (function(i){
                         
                        // Request API for item rarity and type using the item id.
                        $.ajax({
                            type: "GET",
                            url: "https://api.guildwars2.com/v2/items?id=" + equipmentArray[i].id,
                            async: true,
                            cache: false,
                            dataType: 'text',
                            
                            success: function(){},
                            error: function(){},
                            complete: function(data){
                                itemObject = JSON.parse(data.responseText);
                                
                                // Store item properties in object and store object in the array of items on the character
                                if(itemObject.type == ("Armor") || itemObject.type == ("Trinket") || itemObject.type == ("Weapon") || itemObject.type == ("Back") ){
                                    var itemObject = {
                                        name: itemObject.name,
                                        rarity: itemObject.rarity,
                                        infusions: equipmentArray[i].infusions,
                                        type: itemObject.type,
                                        slot: equipmentArray[i].slot,
										agonyResist: 0
                                    }
                                    
                                    // Push to equipment array. 
                                    account.characterDictionary[character].equipmentRarity.push(itemObject);
                                    
                                }   
                                
                                // Increase counter for callback
                                gearCheckCounter++;

                                // If it's the last character and the last equipment piece of that character, then we can go on!    
                                if(character == account.characters[account.characterAmount-1]
                                && gearCheckCounter == (equipmentArray.length)-1){
                                    console.log("CHECK CHECK DUBBELCHECK all done callback ready jeuj");
                                    onDataReady();
                                }  
                            }
                        });              
                    })(i);
                }
                
                // Add total agony resist dictionary to data.
                account.characterDictionary[character].agonyResist = agonyResistCounter;
            }
        }(character));
    }    
}


/* Function that transforms the obtained data about agony resist and armor pieces and combines them into a
structure that is suitable for a sunburst visualization. This needs to be done after since the item object itself and
the agony resist are not retrieved at the same time, so making this can only occur after calculating AR is done. 
Request is done on a per characeter basis because sunburst is only made once a specific bar is clicked. However,
the result is stored  after creating it once so it does not need to be remade every time after.  */
function transformDataForSunBurst(character){
    
    
    // Get the equipment array containing objects form the character dictionary.
    var  equipment = account.characterDictionary[character].equipmentRarity;
    var sunburstObject = {
        
        "name" : "Equipment",
        "children" : [
        
            {"name" : "Armor"
               "children" : []
            },
            {"name" : "Trinkets"
               "children" : []
            }, 
            {"name" : "Weapons"
               "children" : []
            },
            {"name" : "Aquatic"
               "children" : []
            },            
        ]
        
    };
    
    for(var piece in equipment)
    {
        
        // If it's an armor piece but not an underwater piece
        if(piece.type == "Armor" && piece.slot != "HelmAquatic")
            sunburstObject.children[0].children.push(piece)
        // If it's a trinket or backpiece
        else if(piece.type == "Trinket" || piece.type == "Back")
            sunburstObject.children[1].children.push(piece)
        else if(piece.type == "Weapon" && !(piece.slot == "WeaponAquaticA" || piece.slot == "WeaponAquaticA"))
            sunburstObject.children[2].children.push(piece)
        else if(piece.slot == "HelmAquatic" || piece.slot == "WeaponAquaticA" || piece.slot == "WeaponAquaticB")
            sunburstObject.children[3].children.push(piece)
            
        
        
    }
    
}



function onDataReady(){
    
    console.log(account.characterDictionary);
	
	var dataArray = [];
    
    for(character in account.characterDictionary){
		console.log(character);
        console.log(account.characterDictionary[character].equipmentRarity);
		
		// Calculate the total agony resist on the gear.
		var equipment = account.characterDictionary[character].equipmentRarity;
		account.characterDictionary[character].agonyResist = calculateAgonyResist(equipment, character);
		
		// Create a new data array for the bar chart, using the character name and total agony resist.
		var dataObject = {
			characterName: character,
			agonyResist: account.characterDictionary[character].agonyResist.total
		}
		
		dataArray.push(dataObject);
		console.log(dataObject);
		
    }

	console.log(dataArray);
	console.log("after loop");
	
	console.log(account.characterDictionary);
	
	// When calculating the AR is done, we can make the barchart.
	makeBarChart(dataArray);
}

/* For a given armor piece, calculate the agony infusions present, and based on the ID of these
infusions return the total amount of agony resist present in the armor piece, trinket or weapon. 
There are many different infusions in this game due to ArenaNet's inconsistent additions and 
revamps of the system, which makes a dictionary necessary to account for all possible types. 
If no infusions are present the infusionsarray will not exist and the function will return 0. */
function calculateAgonyResist(equipment, character){
    
    var infusionDictionary = {
		
		// Stat infusions, legacy infusions, aura infusions
		"75480" : 3,
		"37137" : 5,
		"37138" : 5,
		"37140" : 5,
		"39616" : 5,
		"39617" : 5,
		"39618" : 5,
		"39619" : 5,
		"39620" : 5,
		"39621" : 5,
		"70852" : 7, 
		"37123" : 7,
		"37127" : 7,
		"37128" : 7,
		"37129" : 7,
		"37133" : 7,
		"37134" : 7,
		"78028" : 9,		"78052" : 9,
		"78012" : 9,
		"78016" : 9, 
		"78030" : 9, 
		"78031" : 9, 
		"78054" : 9, 
		"78057" : 9, 
		"78079" : 9, 
		"78086" : 9, 
		"78090" : 9, 
		"78097" : 9, 
		"79639" : 9, 
		"79653" : 9, 
		"79661" : 9, 
		"79665" : 9, 
		"79669" : 9, 
		"79674" : 9,
		"77274" : 9,
		"77303" : 9,
		"77310" : 9,
		"77316" : 9,
		"77366" : 9,
		"77394" : 9,
		"79943" : 9,
		"79957" : 9,
		"79959" : 9,
		"79978" : 9,
		"79994" : 9,
		"80063" : 9,
		"37125" : 9,
		"37130" : 9,
		"37131" : 9,
		"37132" : 9,
		"37135" : 9,
		"37136" : 9,
		"37131" : 9,
				// Regular infusions that can be broken down/crafted		"49424" : 1,			"49425" : 2,			"49426" : 3,			"49427" : 4,			"49428" : 5,			"49429" : 6,		"49430" : 7,				"49431" : 8,				"49432" : 9,		"49433" : 10,			"49434" : 11,			"49435" : 12,		"49436" : 13,			"49437" : 14,			"49438" : 15,			"49439" : 16,			"49440" : 17,				"49441" : 18,		"49442" :19,				"49443" : 20,
		
		// Nonsense values map to 0 for safety
		undefined: 0,
		"undefined" : 0,
		NaN : 0
		
	};
	
	// Counters to track different sources of AR.
	var agonyResist = { 
		total: 0,
		trinkets: 0,
		armor: 0,
		weaponsA: 0,
		weaponsB: 0,
		aquatic: 0
	}
	
	// Iterate over all the items.
	for(item in equipment){
	
		// If the item has one or multiple infusions.
		if(equipment[item].infusions != undefined){
		
			// Loop over all the infusions in the item.
			for(var i = 0; i < equipment[item].infusions.length; i++){
			
				var infusion = equipment[item].infusions[i];
				
				// Add agony resist back to the item object for later reference.
				equipment[item].agonyResist += infusionDictionary[infusion];
			
				// If it's a weapon, check which one.
				if(equipment[item].type == "Weapon"){
					
					switch(equipment[item].slot){
					
						case "WeaponA1":
							agonyResist.weaponsA += infusionDictionary[infusion];
							break;
						case "WeaponA2":
							agonyResist.weaponsA += infusionDictionary[infusion];
							break;
						case "WeaponB1":
							agonyResist.weaponsB += infusionDictionary[infusion];
							break;
						case "WeaponB2":
							agonyResist.weaponsB += infusionDictionary[infusion];
							break;
						case "WeaponAquaticA":
							agonyResist.aquatic += infusionDictionary[infusion];
							break;
						case "WeaponAquaticB":
							agonyResist.aquatic += infusionDictionary[infusion];
							break;						
					}
				}
				
				// If it's a trinket or backpiece, add to total. Discard amulet since these infusions are not AR ones.
				else if((equipment[item].type == "Trinket" && equipment[item].slot != "Amulet") || equipment[item].type == "Back"){
					agonyResist.trinkets += infusionDictionary[infusion];
				}
				
				// If it's armor, check for aquabreather and else add to total.
				else if(equipment[item].type == "Armor"){
					
					if(equipment[item].slot != "HelmAquatic")
						agonyResist.armor += infusionDictionary[infusion];
					else				
						agonyResist.aquatic += infusionDictionary[infusion];
				}
		
			}
		}
	}
    
	console.log(agonyResist.armor, agonyResist.trinkets, agonyResist.weaponsA, agonyResist.weaponsB, agonyResist.aquatic);
	
	// Calculate the effective total using the weapon set with the biggest amount and discarding underwater weapons.
	agonyResist.total = agonyResist.armor + agonyResist.trinkets;
	
	if(agonyResist.weaponsA < agonyResist.weaponsB)
		agonyResist.total += agonyResist.weaponsB
	else if (agonyResist.weaponsA > agonyResist.weaponsB)
		agonyResist.total += agonyResist.weaponsA
	else
		agonyResist.total += agonyResist.weaponsA
	
	// Return the object with all the data.
	console.log(agonyResist);
	
    return agonyResist;
}


/* Maps the data to a format that is well received by the bar chart. */
function makeBarChart(data){
		
        
    console.log(account.characterDictionary["Asvata"].equipmentRarity);   
        
	console.log("entered bar chart part");	
	
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
		return "<span>" + d.agonyResist + "</span>";
		})
		
	// set the dimensions of the canvas
	var margin = {top: 20, right: 20, bottom: 150, left: 40},
		width = 800 - margin.left - margin.right,
		height = 600 - margin.top - margin.bottom;


	// set the ranges
	var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
	var y = d3.scale.linear().range([height, 0]);

	  // Scale the range of the data
	  x.domain(data.map(function(d) { return d.characterName; }));
	  y.domain([0, 150]);
	
	// define the axis
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(15);


	// add the SVG element
	var svg = d3.select(".barchartpart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", 
			  "translate(" + margin.left + "," + margin.top + ")");
	svg.call(tip);

	  // add axis
	  svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis)
		.selectAll("text")
		  .style("text-anchor", "end")
		  .attr("dx", "-.8em")
		  .attr("dy", "-.55em")
		  .attr("transform", "rotate(-90)" );

	  svg.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", -15)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("Agony Resist");

	  // Add bar chart
	  svg.selectAll("bar")
		  .data(data)
		.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.characterName); })
			.attr("width", x.rangeBand())
			.attr("y", function(d) { return y(d.agonyResist); })
			.attr("height", function(d) { return height - y(d.agonyResist); })
			.style("fill", "#7aa4e8")
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)
			.on("click", function(d) {
				console.log("test" + d.characterName);
			});
}

/* ACHIEVEMENTS AND SUCH */
function getFractalAchievements(callback){
	
	// Get the array of API 
	$.ajax({
	type: "GET",
	async: true,
	url: "https://api.guildwars2.com/v2/account/achievements?access_token=" + account.apiKey,
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