/* Renske Talsma
	10896503
	SORRY TIM IK WAS HET WEER VERGETEN VERGEEF DEZE COMMIT
*/

/* Wait until page is ready. */
$('document').ready(function(){
	getJSONfile(constructChart);
});

/* Retrieves data from a given JSON file. */
function getJSONfile(callback){
    d3.json("./data.json", function(rawData) {
        callback(rawData);
    });
}

/* Makes a stacked bar chart with the data. Different tutorials and examples used:
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

	  
    /* TOOLTIPS, COLORS AND LABELS*/		
	
	// Colors to use and labels.
    var labels = ["Infrastructuur", "Bebouwing", "Semibebouwing", "Recreatie", "Agrarisch", "Natuur", "Binnenwater", "Buitenwater"]; 
    var colors = ["#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#c7eae5", "#80cdc1", "#35978f", "#01665e"];
    var totalsProv = [295964, 574876, 268043, 342074, 241231, 513630, 144913, 409191, 341880, 293344, 508206, 220950];
	var totalsType = [116123, 355986, 51002, 102561, 2252233, 490088, 367982, 418325];
    const NL_SIZE = 4154302;
	
	// For the bar chart, displays total ha, percentage of Netherlands and percentage of provincie.
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-20, 0])
		.html(function(d, i) {
			return d.y + " hectare </br>" + (d.y / NL_SIZE * 100).toFixed(2)  +  "% van Nederland</br>"
			+ (d.y / totalsProv[i] * 100 ).toFixed(2) + "% van de provincie";
	});
	svg.call(tip);

	// For the legend, displays total ha of this type, and the percentage of the Netherlands composed of this type.
	var tipLegend = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-20, 0])
		.html(function(d, i) {
			var total = totalsType.slice().reverse()[i];
			return  total + " hectare </br>" + (total / NL_SIZE * 100).toFixed(2)  +  "% van Nederland</br>";
	});
	svg.call(tipLegend);

	
    /* AXES AND TITLE */

	svg.append("text")
		.attr("x", (width / 2))             
		.attr("y", 0 - (margin.top / 2))
		.attr("text-anchor", "middle")  
		.style("font-size", "36px") 
		.style("text-decoration", "bold")
		.style("font-family", "arial")
		.text("Bodemgebruik per provincie in hectare");
		
	svg.append("text")
		.attr("x", (width / 2))             
		.attr("y", 0 - 20)
		.attr("text-anchor", "middle")  
		.style("font-size", "15px") 
		.style("font-family", "arial")
		.text("Bron: CBS, cijfers bodemgebruik Nederland 2012");

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
        .on("mouseover", function(d, i) { 
			tip.show(d, i)
			d3.select(this).style("opacity", "1"); 
		})
        .on("mouseout", function(d, i) { 
			tip.hide(d, i)
			d3.select(this).style("opacity", "0.9"); 
		})

        
    /* LEGEND */    
   
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
      
        // When hovering over the legend, highlight the corresponding parts of the bar graph and show tooltip.
        .on("mouseover", function(d, i){ 
			tipLegend.show(d, i);
            var colorClass = "." + d3.select(this).attr("class")
            d3.selectAll(colorClass).selectAll(".barrect").style("opacity", "1");

        })    
        // Reset the opacity when the mouse moves out of the legend and remove tooltip.
        .on("mouseout", function(d, i){
			tipLegend.hide(d, i);
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
}