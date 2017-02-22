var svg = d3.select("div.output svg")

var selection = svg.selectAll("rect")
  .data([127, 61, 256, 71])

// Shorter
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