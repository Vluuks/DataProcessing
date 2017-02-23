getJSONfile(constructChart);

function getJSONfile(callback){
    d3.json("./data.json", function(rawData) {
        callback(rawData);
    });
}


/* Makes a stacked bar chart with the data. Different tutorials  and examples used:
http://stackoverflow.com/questions/31981299/d3-stacked-chart-with-array-or-json-data
http://jsfiddle.net/xavipolo/q5q6331p/
https://bl.ocks.org/mbostock/3886208
*/ 
function constructChart(data){

    // SVG and margins.
    var margin = {top: 40, right: 160, bottom: 85, left: 60};
    var width = 1000 - margin.left - margin.right,
        height =780 - margin.top - margin.bottom;

    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Transpose the data into the blocks of the stacked chart.
    var dataset = d3.layout.stack()(["Infrastructuur", "Bebouwing", "Semibebouwing", "Recreatie", "Agrarisch", "Natuur", "Binnenwater", "Buitenwater"].map(function(type) {
      return data.map(function(d) {
        return {x: (d.Regio), y: +d[type]};
      });
    }));

    // Set x, y and colors.
    var x = d3.scale.ordinal()
      .domain(dataset[0].map(function(d) { return d.x; }))
      .rangeRoundBands([10, width-10], 0.02);

    var y = d3.scale.linear()
      .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
      .range([height, 0]);

    var colors = ["#747d8c", "#993710", "#cae216", "#a35b99", "#f4bc77", "#4c7a3a", "#77e1f4", "#372f8e"];

    // Define and draw axes.
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10)
      .tickSize(-width, 0, 0)
      .tickFormat( function(d) { return d + " ha"} );

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
    
    // Add the Y-axis.
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

     // Add the X-axis and rotate the text so that it's legible.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
             .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

    // Create groups for each series, rects for each segment. 
    var groups = svg.selectAll("g.surface")
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .style("fill", function(d, i) { return colors[i]; })

    var rect = groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .attr("width", x.rangeBand())
        .attr("opacity", "0.9")
        
        // Handle mouseovers of the graph
        .on("mouseover", function() { tooltip.style("display", null); d3.select(this).style("opacity", "1.0"); })
        .on("mouseout", function(d, i) { d3.select(this).style("opacity", "0.9"); tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d.y + " ha");  // would like to add the type?
        });

    // Draw legend with colors.
    var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
     
    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) {return colors.slice().reverse()[i];});
     
    legend.append("text")
      .attr("x", width + 5)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d, i) { 
        switch (i) {
          case 0: return "Buitenwater";
          case 1: return "Binnenwater";
          case 2: return "Natuur";
          case 3: return "Agrarisch";
          case 4: return "Recreatie";
          case 5: return "Semi-bebouwing";
          case 6: return "Bebouwing";
          case 7: return "Infrastructuur";
        }
      });


    // Prep the tooltip bits, initial display is hidden
    var tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("display", "none");
    
    // Add the tootltip label
    tooltip.append("rect")
      .attr("x", 15)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("width", 70)
      .attr("height", 16)
      .attr("fill", "white")
      .style("opacity", 0.5);

    // Add text to the label
    tooltip.append("text")
      .attr("x", 16)
      .attr("dy", "1.2em")
      //.style("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("font-family", "Arial");
      
      // Add the title
      svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "17px") 
        .style("font-family", "arial")
        .text("Bodemgebruik per provincie in hectare");
}