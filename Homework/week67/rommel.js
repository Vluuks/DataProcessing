        "Groggie",
        "Haesia",
        "Atmach Duskbane",
        "Feorainn",
        "Ronaigh",
        "Kyvaro",
        "Clarente",
        "Pseron",
        "Altamia",
        "Caprauna",
        "Rodesha",
        "Tizli",
        "Arieluma",
        "Nochsana",
        "Yleste",
        "Vlokka",
        "Imcean",
        "Dhatra Fiercefang",
        "Esmesanti",
        "Ibba",
        "Alindi",
        "Luusie",
        "Tahabata Pyrefang",
        "Nedakha",
        "Asvata",
        "Syrbe",
        "Count Hagelslag"
        
        
 / Request API for item rarity and type using the item id.
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