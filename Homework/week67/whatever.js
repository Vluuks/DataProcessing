/* Renske Talsma
	10896503
	
	A complete clusterfuck
	
*/

var deDataDerData = [
	{
		"label": "Engineer", 
		"value":"2"
	},
	{
		"label": "Ranger", 
		"value":"2"
	},
	{
		"label": "Thief", 
		"value":"2"
	},
	{
		"label": "Elementalist", 
		"value":"2"
	},
	{
		"label": "Mesmer", 
		"value":"2"
	},
	{
		"label": "Necromancer", 
		"value":"2"
	},
	{
		"label": "Revenant", 
		"value":"2"
	},
	{
		"label": "Guardian", 
		"value":"2"
	},
	{
		"label": "Warrior", 
		"value":"2"
	}
];

var deBesteData = {
	
		initiate : [ false, true, true, true, false, false, false, true, true, true],
		adept : [ false, true, true, true, false, false, false, true, true, true],
		expert : [ false, true, true, true, false, false, false, true, true, true],
		master : [ false, true, true, true, false, false, false, true, true, true]
		
}

var echteArrayDataWow = [
	{ 
		"characterName" : "test test test",
		"agonyResist" : 40
	},
	{ 
		"characterName" : "test2",
		"agonyResist" : 30
	},
	{ 
		"characterName" : "test3 character with a long name",
		"agonyResist" : 40
	},
	{ 
		"characterName" : "teewgwgwst4",
		"agonyResist" : 80
	},
	{ 
		"characterName" : "testewewgw4",
		"agonyResist" : 50
	},
	{ 
		"characterName" : "tewegwgwgst4 fsaifhiasfh aisfhasifha",
		"agonyResist" : 150
	}
];


var tempData = {
    "name": "Equipment",
    "children" : [
    
        { 
            "name": "Armor",
            "children": [
                
                {
                    name: "Woww heeee",
                    rarity: "Rare",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "Wat leuk test 1234",
                    rarity: "Fine",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "Sample",
                    rarity: "Masterwork",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "ayyyyy",
                    rarity: "Exotic",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "Sample TEXT TEST TEST LENGTE",
                    rarity: "Ascended",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 }
            
            ]
            
        },
        { 
            "name": "Weapons",
            "children": [
                
                {
                    name: "Sample",
                    rarity: "Ascended",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "Sample",
                    rarity: "Basic",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "Sample",
                    rarity: "Legendary",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "Sample",
                    rarity: "Rare",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "Sample",
                    rarity: "Rare",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 }
            
            ]
            
        },
        { 
            "name": "Trinkets",
            "children": [
                
                {
                    name: "Test test test test test testttttttttttttt",
                    rarity: "Basic",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "Sample",
                    rarity: "Ascended",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "Sample",
                    rarity: "Legendary",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "Sample",
                    rarity: "Exotic",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 },
                 {
                    name: "Sample",
                    rarity: "Basic",
                    infusions: "N/A",
                    type: "Armor",
                    slot:  "Head",
                    agonyResist: 9,
                    size: 1
                 }
            
            ]
            
        }
    ]
};

/***** OBJECTS AND CONSTANTS  **************************************************************************************************/

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
	accountName: "",
    apiKey: "",
    hoursPlayed: -1,
    characters: [],
    characterAmount: -1,
    fractalLevel: -1,
    fractalRelics: -1,
    fractalPristine: -1,
    characterDictionary: {}
}

var colorDictionary = {
	
	// Rarities.
	"Basic" : "#f2f2f2",
	"Fine" : "#569fff",
	"Masterwork" : "#6dad1f",
	"Rare" : "#ffc700",
	"Exotic" : "#ff8800",
	"Ascended" : "#dd1a7f",
	"Legendary" : "#8119d1",
	
	// Categories.
	"Armor" : "#75645b",
	"Weapons" : "#4c4441",
	"Aquatic" : "#8e817c",
	"Trinkets" : "#99837b",
	
	// Professions.
	"Guardian" : "#2a6cd6",
	"Dragonhunter" : "#2a6cd6",
	"Revenant" : "#a85555",
	"Herald" : "#a85555",
	"Warrior" : "#e2ad18",
	"Berserker" : "#e2ad18",
	"Engineer" :  "#915a31",
	"Scrapper" : "#915a31",
	"Thief" :  "#66605b",
	"Daredevil" : "#66605b",
	"Ranger" : "#99c661",
	"Druid" : "#99c661",
	"Elementalist" : "#ce3b40",
	"Tempest" : "#ce3b40", 
	"Mesmer" :  "#ce3bc9",
	"Chronomancer" : "#ce3bc9",
	"Necromancer" : "#3a916e",
	"Reaper" : "#3a916e"
}

/* Wait until page is ready. */
$('document').ready(function() {
	console.log("page ready");
	
	// DIKKE ONZIN TODO
	makeSunburst(tempData);
	makeBarChart(echteArrayDataWow);
	makePieCharts(deDataDerData);
	makeAchievementGraph(deBesteData);
	
	// Manage DOM element visibilities.
	$('#error').hide();
	//$('#accountdiv').hide();

});

/* Small function that takes a string and shows it in the error span on top of the page. */
function showError(errorMessage) {
	$('#error').show();
    $('#error').text(errorMessage);
}


/***** DATA RETRIEVAL **************************************************************************************************/

/* Check the given API and then start retrieving data if it has been verified. 
This function is invoked by pressing the button on the webpage. */
function getUserApi() {
	
	// Hide DOM element.
	$('#error').hide();

    // Check for basics
    var apiKey = $("#apiKey").val().trim();

    //apiKey = "F42B9440-82CB-0D4A-AA45-1594E292B1FB08137C88-69C5-4779-8740-43FA4C501EE0";
	apiKey = "8517F046-B25D-BF4B-AC3A-1F001F87E5902EAC6607-483A-434F-AB8B-DB65718FF374";
	//apiKey = "ikoh";
    
    if (apiKey == "" || apiKey == undefined)
    {
    	showError("Please do not omit the field");
    }
    else{
        
        if (/^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{20}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/.test(apiKey)) {

			$.ajax({
			type: "GET",
			async: true,
			url: "https://api.guildwars2.com/v2/tokeninfo?access_token=" + apiKey,
			cache: false,
			dataType: 'text',
			
				success: function () {},
				error: function() {
                    showError("The GW2 API seems to be down, please come back at a later time.");
				},
				// Check if it's a valid key even if it passed regex
				complete: function(data) {

					var apiResult = JSON.parse(data.responseText);
					console.log(apiResult);
					
					// If the key matches the expected format but is still invalid
					if (apiResult.text && (apiResult.text.equals("endpoint requires authentication") || apiResult.text.equals("invalid key")))
						showError("Your API key is not valid or is missing permissions.");
				
					// If the permissions array exists in JSON
					if (apiResult.permissions) {
						
						var permissionCount = 0;
						for (var i = 0; i <apiResult.permissions.length; i++) {
							
							// Check for the necessary permissions
							// Possible permissions can be found at https://wiki.guildwars2.com/wiki/API:2/tokeninfo
							switch(apiResult.permissions[i]) {
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
						if (permissionCount == 4)
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
function apiCheckCallback(apiKey) {
    
    // Make api global now that it has been verified.
    account.apiKey = apiKey;
	
	// Get characters and in turn character equipment.
    getCharacters(getGeneralCharacterInfo);
    
	// Retrieve the fractal achievements and perform display cb.
	getFractalAchievements(displayFractalAchievements);
}

/* This function retrieves a list of the characters on the account from the API and then
calls the callback which will retrieve additional info based on the character names. */
function getCharacters(callback) {
 
    $.ajax({
		type: "GET",
		async: true,
		url: "https://api.guildwars2.com/v2/characters?access_token=" + account.apiKey,
		cache: false,
		dataType: 'text',
		
			success: function() {},
			error: function() {
                showError("Something went wrong fetching the character info.");
            },
			complete: function(data) {
						
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
function getGeneralCharacterInfo() {
  
    var characterArray = account.characters;
    var counter = 0;

    for (let i = 0; i < account.characterAmount; i++) { 
        (function(i) {
        
            $.ajax({
                type: "GET",
                async: true,
                url: "https://api.guildwars2.com/v2/characters/" + characterArray[i] + "?access_token=" + account.apiKey,
                cache: false,
                dataType: 'text',               
                success: function() {},
                error: function() {
					showError("Something went wrong fetching the character info.");
				},
                complete: function(data) {
                            
                    // Convert json data to javascript object.
                    var characterObject = JSON.parse(data.responseText);
                    counter++;
					
                    // Add properties to the object.
                    var character = new Character();
                    character.race = characterObject.race;
                    character.level = characterObject.level;
                    character.equipment = characterObject.equipment;
                    character.profession = characterObject.profession;
                    character.hoursPlayed = (characterObject.age / 3600).toFixed(0);
                    account.characterDictionary[characterObject.name] = character;
                    
                    if (counter == characterArray.length) {
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
function fetchEquipment() {
   
   // Iterate over the characters in the dictionary and access equipment array for each.
    for (let character in account.characterDictionary) {
        (function(character) {
            if (account.characterDictionary.hasOwnProperty(character)) {
                
                var equipmentArray = account.characterDictionary[character].equipment;
                var agonyResistCounter = 0;
                var gearCheckCounter = 0;
                
                // Loop over the equipment array and perform check on each piece that is present.
                for (let i = 0; i < equipmentArray.length; i++) {
                    (function(i) {
                         
                        // Request API for item rarity and type using the item id.
                        $.ajax({
                            type: "GET",
                            url: "https://api.guildwars2.com/v2/items?id=" + equipmentArray[i].id,
                            async: true,
                            cache: false,
                            dataType: 'text',
                            
                            success: function() {},
                            error: function() {
								showError("Something went wrong fetching the equipment info.");
							},
                            complete: function(data) {
                                itemObject = JSON.parse(data.responseText);
                                
                                // Store item properties in object and store object in the array of items on the character
                                if (itemObject.type == ("Armor") || itemObject.type == ("Trinket") || itemObject.type == ("Weapon") || itemObject.type == ("Back") ) {
                                    var itemObject = {
                                        name: itemObject.name,
                                        rarity: itemObject.rarity,
                                        infusions: equipmentArray[i].infusions,
                                        type: itemObject.type,
                                        slot: equipmentArray[i].slot,
										agonyResist: 0,
                                        size: 1
                                    }
                                    
                                    // Push to equipment array. 
                                    account.characterDictionary[character].equipmentRarity.push(itemObject);
                                    
                                }   
                                
                                // Increase counter for callback
                                gearCheckCounter++;

                                // If it's the last character and the last equipment piece of that character, then we can go on!    
                                if (character == account.characters[account.characterAmount-1] && gearCheckCounter == (equipmentArray.length)-1) {
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

/* For a given armor piece, calculate the agony infusions present, and based on the ID of these
infusions return the total amount of agony resist present in the armor piece, trinket or weapon. 
There are many different infusions in this game due to ArenaNet's inconsistent additions and 
revamps of the system, which makes a dictionary necessary to account for all possible types. 
If no infusions are present the infusionsarray will not exist and the function will return 0. */
function calculateAgonyResist(equipment, character) {
    
	// A dictionary containing key value pairs of item ids and agony resist.
    var infusionDictionary = {
		
		// Stat infusions, legacy infusions, aura infusions.
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
		"78028" : 9,
		"78052" : 9,
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
		
		// Regular infusions that can be broken down/crafted.
		"49424" : 1,	
		"49425" : 2,	
		"49426" : 3,	
		"49427" : 4,	
		"49428" : 5,	
		"49429" : 6,
		"49430" : 7,		
		"49431" : 8,		
		"49432" : 9,
		"49433" : 10,	
		"49434" : 11,	
		"49435" : 12,
		"49436" : 13,	
		"49437" : 14,	
		"49438" : 15,	
		"49439" : 16,	
		"49440" : 17,		
		"49441" : 18,
		"49442" :19,		
		"49443" : 20,
		
		// Nonsense values map to 0 for safety.
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
	for (item in equipment) {
	
		// If the item has one or multiple infusions.
		if (equipment[item].infusions != undefined) {
		
			// Loop over all the infusions in the item.
			for (var i = 0; i < equipment[item].infusions.length; i++) {
			
				var infusion = equipment[item].infusions[i];
				
				// Add agony resist back to the item object for later reference.
				equipment[item].agonyResist += infusionDictionary[infusion];
			
				// If it's a weapon, check which one.
				if (equipment[item].type == "Weapon") {
					
					switch(equipment[item].slot) {
					
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
				else if ((equipment[item].type == "Trinket" && equipment[item].slot != "Amulet") || equipment[item].type == "Back") {
					agonyResist.trinkets += infusionDictionary[infusion];
				}
				
				// If it's armor, check for aquabreather and else add to total.
				else if (equipment[item].type == "Armor") {
					
					if (equipment[item].slot != "HelmAquatic")
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
	
	// Take the weapon set with the higher agony resist.
	if (agonyResist.weaponsA < agonyResist.weaponsB)
		agonyResist.total += agonyResist.weaponsB;
	else if (agonyResist.weaponsA > agonyResist.weaponsB)
		agonyResist.total += agonyResist.weaponsA;
	else
		agonyResist.total += agonyResist.weaponsA;
	
    return agonyResist;
}

/* When the data is ready, calculate the total agony resist on the gear and store this in an object
that can be visualized in a bar chart. */
function onDataReady() {

	var dataArray = [];  
    for (character in account.characterDictionary) {

		// Calculate the total agony resist on the gear.
		var equipment = account.characterDictionary[character].equipmentRarity;
		account.characterDictionary[character].agonyResist = calculateAgonyResist(equipment, character);
		
		// Create a new data array for the bar chart, using the character name and total agony resist.
		var dataObject = {
			characterName: character,
			agonyResist: account.characterDictionary[character].agonyResist.total
		}
		
		dataArray.push(dataObject);
    }
	
	// When calculating the AR is done, we can make the barchart.
	makeBarChart(dataArray);
}

function getFractalAchievements(callback) {
	
	// Get the array of API 
	$.ajax({
	type: "GET",
	async: true,
	url: "https://api.guildwars2.com/v2/account/achievements?access_token=" + account.apiKey,
	cache: false,
	dataType: 'text',
	
		success: function() {
		},
		error: function() {
			showError("Could not retrieve information about achievements.");
		},
		complete: function(data) {
			
			var achievementArray = JSON.parse(data.responseText);
			var fractalAchievementArray = new Array(4);
			
			// Find the fractal achievements in the array (they do not have a fixed index, unfortunately).
			for (var i = 0, length = achievementArray.length; i < length; i++) {
				switch(achievementArray[i].id) {
					
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
			
			callback(fractalAchievementArray);
		}
	});
}

/* This function writes the data that has been retrieved from the API to a text file in JSON format. 
This ensures that even if the API is down the visualization can be run with this data. */
function makeBackUp() {
	// WHY DID I NOT IMPLEMENT THIS WHEN IC OULD
}



/***** VISUALIZATIONS **************************************************************************************************/

/* Updates the sidebar with information about the current account that is being viewed.*/
function setAccountData() {
	
	// Account name
	// total age
	// amount of characters
	
	
	var dataString = "wasasfsa";
	
	// Select account data paragraph and set the text.
	 $('#account').text();
	
}

/* Displays small pie charts in the sidebar with class and race distribution. */
function makePieCharts(data){

	// Set dimensions of the pie chart.
	var width = 150,
		height = 150,
		radius = height/2;
	
	// Append svg to div.
	var pieChart = d3.select('#sidebar').append("svg:svg")
		.data([data])
		.attr("width", width)
		.attr("height", height)
		.append("svg:g")
		.attr("transform", "translate(" + radius + "," + radius + ")");
	
	var pie = d3.layout.pie()
		.value(function(d){ console.log(d.value); return d.value; });
		
	// Arc generator.
	var arc = d3.svg.arc().outerRadius(radius);	
	var arcs = pieChart.selectAll("g.slice")
		.data(pie)
		.enter()
		.append("svg:g")
		.attr("class", "slice");
	
	// Set colors of each slice.
	arcs.append("svg:path")
		.attr("fill", function(d, i){ return colorDictionary[data[i].label]; })

	// Add text labels.
	arcs.append("svg:text").attr("transform", function(d){
			d.innerRadius = 0;
			d.outerRadius = radius;
			return "translate(" + arc.centroid(d) + ")";})
				.attr("text-anchor", "middle").text( function(d, i) { return data[i].label; });
}

/* Draws the bar chart that shows each character and their level of agony resist. The maximum 
amount is infinite in theory but more than 150 makes no sense, so the max of the chart is set at 150. */
function makeBarChart(data) {
	
	// Set the dimensions of the canvas.
	var margin = {top: 20, right: 20, bottom: 50, left: 50},
		width = 800 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	// Set the domain and range.
	var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
	var y = d3.scale.linear().range([height, 0]);
	x.domain(data.map(function(d) { return d.characterName; }));
	y.domain([0, 150]);
	
	// Define the axes.
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(15);

	// Add the SVG element.
	var svg = d3.select("#barchartpart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", 
			  "translate(" + margin.left + "," + margin.top + ")");
			  
	// Add tooltip.
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-2, 0])
		.html(function(d) {
			return "<span>" + d.agonyResist + "</span>";
		});	
	svg.call(tip);

	// Add the Y axis.
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", -43)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.attr("fill", "#666666")
		.text("total Agony Resistance");

	// Add bar chart.
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
					transformDataForSunBurst(d.characterName);
				});

	// Add X axis, done after bar chart so text is over it instead of under it.
	svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis)
	.selectAll("text")
		.style("text-anchor", "start")
		.attr("dx", "1em")
		.attr("dy", "-.55em")
		.attr("transform", "rotate(-90)" );
	
				
	// Make bar chart x axis ticks clickable.
	svg.selectAll(".y.axis .tick")
		.on("click", function(d) {  
			// Get character name, 
			// go to sunburst of character name
			console.log(d);
		});
	
}

/* Makes the indices of the fractal achievement that have been completed into an array of booleans so
that both incomplete and complete achievements can be shown accurately. */
function displayFractalAchievements(dataArray) {
	
	// Turn the array into a more useful/uniform data format.
	for (var i = 0; i < dataArray.length; i++) {
	
		// Initialize an array full of true. 
		achievementBoolArray = new Array(25);
		for (var j = 0; j < achievementBoolArray.length; j++)
			achievementBoolArray[j] = true;
		
		// Set incomplete achievements to false for indices in subarrays.
		for (var k = 0; k < dataArray[i].length; k++) {
			achievementBoolArray[dataArray[i][k]] = false;
		}
		
		dataArray[i] = achievementBoolArray;
	}
	
	// Now I can do something with the data!
}

/* Function that transforms the obtained data about agony resist and armor pieces and combines them into a
structure that is suitable for a sunburst visualization. This needs to be done after since the item object itself and
the agony resist are not retrieved at the same time, so making this can only occur after calculating AR is done. 
Request is done on a per characeter basis because sunburst is only made once a specific bar is clicked. However,
the result is stored  after creating it once so it does not need to be remade every time after.  */
function transformDataForSunBurst(character) {
    
    // Get the equipment array containing objects form the character dictionary.
    var  equipment = account.characterDictionary[character].equipmentRarity;
    var sunburstObject = {
        
        "name" : "Equipment",
        "children" : [
        
            {"name" : "Armor",
               "children" : []
            },
            {"name" : "Trinkets",
               "children" : []
            }, 
            {"name" : "Weapons",
               "children" : []
            },
            {"name" : "Aquatic",
               "children" : []
            },            
        ]
    };
    
	// Loop over the equipment pieces and construct data accordingly.
    for (var piece in equipment)
    {
        var currentPiece  = equipment[piece];

        // If it's an armor piece but not an underwater piece
        if (currentPiece.type == "Armor" && currentPiece.slot != "HelmAquatic")
            sunburstObject.children[0].children.push(currentPiece);
        // If it's a trinket or backpiece
        else if (currentPiece.type == "Trinket" || currentPiece.type == "Back")
            sunburstObject.children[1].children.push(currentPiece);
        // If it's a weapon but not an underwater weapon
        else if (currentPiece.type == "Weapon" && !(currentPiece.slot == "WeaponAquaticA" || currentPiece.slot == "WeaponAquaticB"))
            sunburstObject.children[2].children.push(currentPiece);
        // If it's an underwater equipment piece
        else if (currentPiece.slot == "HelmAquatic" || currentPiece.slot == "WeaponAquaticA" || currentPiece.slot == "WeaponAquaticB")
            sunburstObject.children[3].children.push(currentPiece);
    }

	// Create the sunburst visualization with this data.
    makeSunburst(sunburstObject);
    
}

/* Function that creates a sunburst visualization with data about a character. The data contains
information about all the gear that a character has on them, and the rarity and name of these
items. */
function makeSunburst(data) {
    
	// Hide the information message.
	$('#sunburstwait').hide();
	
    // Set dimensions of the visualization.
    var width = 600,
        height = 600,
        radius = Math.min(width, height) / 2;

    // Make x and y scales.
    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.linear()
        .range([0, radius]);

    // Add svg to webpage.
    var svg = d3.select("#piechartpart").append("svg")
        .attr("width", width)
        .attr("height", height + 20)
		.append("g")
			.attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

    var partition = d3.layout.partition()
        .value(function(d) { return d.size; });

    var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

    // Add data to the svg.
    var g = svg.selectAll("g")
        .data(partition.nodes(data))
            .enter().append("g");

    var path = g.append("path")
        .attr("d", arc)
        .style("fill", function(d) {
            
			// Determine the color of the data point.
            if (d.name == "Weapons" || d.name == "Armor" || d.name == "Aquatic" || d.name == "Trinkets")
                return colorDictionary[(d.children ? d : d.parent).name]; 
            if (d.name == "Equipment")
                return "#DDDDDD";
            else
                return colorDictionary[d.rarity];
        })
        .on("click", click);

	// Append text to  each block of the sunburst. 
      var text = g.append("text")
        .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
        .attr("x", function(d) { return y(d.y); })
        .attr("dx", "6") // margin
        .attr("dy", ".35em") // vertical-align
        .text(function(d) { return d.name; });

	// Function that handles clicks on the sunburst so that it can zoom.
    function click(d) {
		
        // Fade out text elements.
        text.transition().attr("opacity", 0);
	
		// Make a transition to the new view.
        path.transition()
			.duration(750)
			.attrTween("d", arcTween(d))
			.each("end", function(e, i) {
			
			// Check if the animated element's data e lies within the visible angle span given in d
			if (e.x >= d.x && e.x < (d.x + d.dx)) {
				
				// Get a selection of the associated text element.
				var arcText = d3.select(this.parentNode).select("text");
				
				// Fade in the text element and recalculate positions.
				arcText.transition().duration(500)
					.attr("opacity", 1)
					.attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
					.attr("x", function(d) { return y(d.y); });
            }
		});
	}

    d3.select(self.frameElement).style("height", height + "px");

    // Interpolate the scales. //TODO VRAAG WAT HIER GEBEURT
    function arcTween(d) {
	var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
		yd = d3.interpolate(y.domain(), [d.y, 1]),
		yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
	return function(d, i) {
        return i
			? function(t) { return arc(d); }
			: function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
		};
    }

    function computeTextRotation(d) {
		return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
    }
}

/* Renders the current status of all fractal tier achievements. */
function makeAchievementGraph(data){

	var color = { "false" : "#5b5b5b", "true" : "#ffcc00" };
	var data = [false, true, true, true, false, true, true, true, false, false, false, true, false, true, true, true, false, false, true, false, false, true, true, false, true ];
	// for every tier, append rectangles?? idk yet how to visualize this very well.
	
	var width = 800,
		height = 320;
	
	// Add svg to webpage.
    var svg = d3.select("#achievementpart").append("svg")
        .attr("width", width)
        .attr("height", height)
	
	console.log(svg);
	
	var rects = svg.selectAll('g')
        .data(data)
        .enter()
		.append("g")
		
	rects.append('rect')	
            //.attr("transform", function(d, i){ return "translate("+ 10*i +", 0)"; })
			.attr("y", 10)
			.attr("x", function(d, i){return i * 32})
			.attr("width", 25)
			.attr("height", 25)
			.style("opacity", "1")
			.style("fill", function(d){ return color[d.toString()]; });
    
	rects.append('text')
				.text(function(d, i){ return i+1; })
				.style("fill", "black")
				.attr("y", 27)
				.attr("x", function(d, i){return 5+ i * 32});
}