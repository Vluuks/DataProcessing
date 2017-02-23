var svg = d3.select("div.output svg")

// selecteer alle rechthoeken
var selection = svg.selectAll("rect")
  .data([127, 61, 256, 71])

// voeg er nog eentje toe
selection.enter().append("rect")

// when updating the regular selection then
// enter selection is joined in to the update
// selection for convenience.
selection
  .attr("x", 0)
  .attr("y", function(d,i) { return i*90+50 })
  .attr("width", function(d,i) { return d; })
  .attr("height", 20)
  .style("fill", "steelblue")
  
  /////////////////////////////////////////////////////////////////////
  
  
  var svg = d3.select("div.output svg")

svg.selectAll("rect") // you can have a selection of zero things in D3, even if there are rectangles yet in the svg you can call this
  .data([127, 61, 256])
  .enter().append("rect")
    .attr("x", 0)
    .attr("y", function(d,i) { return i*90+50 })
    .attr("width", function(d,i) { return d; })
    .attr("height", 20)
    .style("fill", "steelblue")
    
    
    ///////////////////
    
var svg = d3.select("div.output svg")

var selection = svg.selectAll("rect")
  .data([2])

selection
  .attr("x", 0)
  .attr("y", function(d,i) { return i*90+50 })
  .attr("width", function(d,i) { return d; })
  .attr("height", 20)
  .style("fill", "steelblue")

selection.exit()
  .remove()
  
  
  // waarom als hij dit runt in de slide dan haalt ie de grijze blokken weg maar niet de blauwe, terwijl de blauwe worden gemaakt voordat de remove wordt gecalld.
 // hoe word t bepaald wat verwijderd wordT?? alleen overbodige rechthoeken etc?
 
 
 // maak alle p rood
 // maak element in p blauw
 // als je daarna de ps rood wil maken kan het niet want het child element overrides dus dan moet je die eerst weer null maken