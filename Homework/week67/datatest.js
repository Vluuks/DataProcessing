

var obj = {
    
    "name": "equipment",
    "children" : [ 
    
        {
            "name" : "armor", // INDEX 0
             "children" : [
             
             {"name": "armor 1"},
             {"name": "armor 2"},
             {"name": "armor 3"},
             {"name": "armor 4"}
             
             ]
            
        },
         {
            "name" : "trinkets", // INDEX 0
             "children" : [
             
             {"name": "armor 1"},
             {"name": "armor 2"},
             {"name": "armor 3"},
             {"name": "armor 4"}
             
             ]
            
        },
        {
            "name" : "weapons", // INDEX 0
             "children" : [
             
             {"name": "armor 1 TEST TEST TEST"},
             {"name": "armor 2"},
             {"name": "armor 3"},
             {"name": "armor 4"}
             
             ]
            
        },
        {
            "name" : "aquatic", // INDEX 0
             "children" : [
             
             {"name": "armor 1"},
             {"name": "armor 2"},
             {"name": "armor 3"},
             {"name": "armor 4"}
             
             ]
            
        }    
    
    ]
};

console.log(obj.children)
console.log(obj.children[2].children[0].name);
