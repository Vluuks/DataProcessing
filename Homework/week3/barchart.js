getJSONfile(constructChart);

function getJSONfile(callback){
    d3.json("./data.json", function(rawData) {
        callback(rawData);
    });
}

// TODO
// onpageload
// totalen per provincie
// totalen per type
// totalen nederland
// mooiere kleuren

/* Makes a stacked bar chart with the data. Different tutorials  and examples used:
http://stackoverflow.com/questions/31981299/d3-stacked-chart-with-array-or-json-data
http://jsfiddle.net/xavipolo/q5q6331p/
https://bl.ocks.org/mbostock/3886208
*/ 
function constructChart(data){

    /* CHART INITIALIZATION */
    var margin = {top: 100, right: 180, bottom: 100, left: 100};
    var width = 1200 - margin.left - margin.right,
        height = 840 - margin.top - margin.bottom;

    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      
    /* DATA TRANSFORMATION */
    
    // Transpose the data into the blocks of the stacked chart.
    var dataset = d3.layout.stack()(["Infrastructuur", "Bebouwing", "Semibebouwing", "Recreatie", "Agrarisch", "Natuur", "Binnenwater", "Buitenwater"].map(function(type) {
      return data.map(function(d) {
        return {x: (d.Regio), y: +d[type]};
      });
    }));

    // Create transform function for X and Y.
    var x = d3.scale.ordinal()
      .domain(dataset[0].map(function(d) { return d.x; }))
      .rangeRoundBands([10, width-10], 0.02);

    var y = d3.scale.linear()
      .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
      .range([height, 0]);

    // Colors to use and labels.
    var labels = ["Infrastructuur", "Bebouwing", "Semibebouwing", "Recreatie", "Agrarisch", "Natuur", "Binnenwater", "Buitenwater"]; //TODO
    var colors = ["#747d8c", "#993710", "#cae216", "#a35b99", "#f4bc77", "#4c7a3a", "#77e1f4", "#372f8e"];
    const NL_SIZE = 4154302;

    
    /* AXES AND AXIS LABELS */
    
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
      .call(yAxis)
             .selectAll("text")
             .style("font-size", "13px")
             .style("font-family", "Arial");

     // Add the X-axis and rotate the text so that it's legible.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
             .selectAll("text")
             .style("font-size", "13px")
             .style("font-family", "Arial")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

            
    /* ACTUAL BARS OF THE CHART */        
            
    //  Make groups of the rectangles.
    var groups = svg.selectAll("g.rectgroups")
        .data(dataset)
        .enter().append("g")
    // Give each rect a class with the color so we can later reference them from the legend.
        .attr("class", function(d, i){ return "C" + colors[i].substr(1); })
        .style("fill", function(d, i) { return colors[i]; })

    // Select all the rectangles in the groups of colors    
    var rect = groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("class", "barrect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .attr("width", x.rangeBand())
        .attr("opacity", "0.9")
        
        // Handle mouseovers of the graph, display the tooltip but adjust opacity as well. 
        .on("mouseover", function() { tooltip.style("display", null); d3.select(this).style("opacity", "1"); })
        .on("mouseout", function(d, i) { d3.select(this).style("opacity", "0.9"); tooltip.style("display", "none"); })
        .on("mousemove", function(d, i) {
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        tooltip.select("text").html(d.y + " ha    </br>" + (d.y / NL_SIZE * 100).toFixed(2)  +  "% van Nederland"); // wtf
        
        });

        
    /* LEGEND, TOOLTIPS AND TITLE */    
        
    // Draw legend with colors.
    var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
            .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
    
    // Add color icons to the legend. The array is reversed so they line up with the graph. 
    legend.append("rect")
        .attr("x", width - 18)
        .attr("y", function(d, i){return i * 20})
        .attr("width", 25)
        .attr("height", 25)
        .style("opacity", "1")
        .style("fill", function(d, i) {return colors.slice().reverse()[i];})
        .attr("class", function(d, i) {return "C" + colors.slice().reverse()[i].substr(1);})
      
        // When hovering over the legend, highlight the corresponding parts of the bar graph.
        .on("mouseover", function(d, i){ 

             // Adjust the opacity on mouseover.
            var colorClass = "." + d3.select(this).attr("class")
            d3.selectAll(colorClass).selectAll(".barrect").style("opacity", "1");
           
        })    
        // Reset the opacity when the mouse moves out of the legend.
        .on("mouseout", function(d, i){
            var colorClass = "." + d3.select(this).attr("class");
            d3.selectAll(colorClass).selectAll(".barrect").style("opacity", "0.9"); 
        });
     
    // Add text to the legend.
    legend.append("text")
        .attr("x", width + 15)
        .attr("y", function(d, i){return i * 20})
        .attr("dy", "1.40em")
        .style("font-family", "Arial")
        .style("font-size", 12)
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
              
    // Add tooltips to graph.
    var tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("display", "none");
    
    // Create a label to show tooltip.
    tooltip.append("rect")
      .attr("x", 15)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("width", 70)
      .attr("height", 16)
      .attr("fill", "white")
      .style("opacity", 0.5);

    // Add text to the label.
    tooltip.append("text")
      .attr("x", 16)
      .attr("height", 20)
      .attr("dy", "1.2em")
      .attr("font-size", "10px")
      .attr("font-family", "Arial");
      
      // Add the title to the graph.
      svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "36px") 
        .style("text-decoration", "bold")
        .style("font-family", "arial")
        .text("Bodemgebruik per provincie in hectare");
}