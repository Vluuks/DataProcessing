/* 
	Renske Talsma
	10896503
	
	chart.js
	Creates a multiline chart with the ability to change the dataset.
	Includes a tooltip on hover. 
	
	Tutorials used:
	> https://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935
	> https://bl.ocks.org/mbostock/3884955
	> http://www.d3noob.org/2013/02/update-d3js-data-dynamically-button.html
	> https://bl.ocks.org/larsenmtl/e3b8b7c2ca4787f77d78f58d41c3da91
	
*/

/* Global dict to store data */
var dataDict = [];

/* Wait until page is ready. */
$("document").ready(function(){
    
    // Load all of the data.  
        queue()
            .defer(d3.json, "Data/data2015.json")
            .defer(d3.json, "Data/data2016.json")
            .await(callbackInit);
});

/* When the data is loaded, check for errors and store it globally. */
function callbackInit(error, data2015, data2016){

	if(error)
		throw error;
	
	// Store globally
	dataDict[0] = data2015;
	dataDict[1] = data2016;

	// Check which dataset to use.
	setData();
}

/* Set the data according to user choice or default. */
function setData(){
	
	var dataYear = $("#yearChoice").val();
	var dataDomain = [];

	switch(dataYear){
		case "2015":
			data = dataDict[0];
			dataDomain =  [new Date(2015,0,1), new Date(2015,11,31)];
			break;
		case "2016":
			data = dataDict[1];
			dataDomain =  [new Date(2016,0,1), new Date(2016,11,31)];
			break;
		default:
			data = dataDict[0];
			dataDomain =  [new Date(2015,0,1), new Date(2015,11,31)];
			break;
	}
   
    // Set title correctly.
    $("#charttitle").text("Wind speed at De Bilt, Netherlands (" + dataYear + ")");
   
	// Initialize canvas with the chosen data.
	drawChart(data, dataDomain)
}

/* Handle the canvas. */
function drawChart(data, dataDomain){
	
	// Find svg and reset if needed.
	var svgChart = $(".linechart");
	if (svgChart !== undefined)
		svgChart.remove();
    
	// Initialize size and margins.
    var margin = {top: 60, right: 65, bottom: 20, left: 65};
    var width = 1600 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;   
    
	// Initialize canvas. 
    var svg = d3.select(".container")
        .append("svg")
        .attr("class", "linechart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    		        
    // Parse the data.
    data.columns = ["Date", "Avg", "High", "Low"];
    var types = data.columns.slice(1).map(function(id) {
        return {
            id: id,
            values: data.map(function(d) {
                return {
                    Date: d.Date, 
                    Value: d[id]    
                };
            })
        };
    });
  
    // Create scales	for X, Y and Z.
	var yScale = d3.scale.linear()
        .range([height - margin.top, margin.bottom])
        .domain([0, 135]);
		
	var xScale = d3.time.scale()
		.domain(dataDomain)   
		.range([margin.left, width - margin.right]);  
  
    var zScale = d3.scale.ordinal(d3.schemeCategory10)
        .domain(types.map(function(c) { return c.id; }));
            
    // Function to draw the line.
	var lineGen = d3.svg.line()
		.x(function(d) {
            return xScale(makeDate(d.Date));
		})
		.y(function(d) {
            return yScale(d.Value);
		});
  
	// Create axes.
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
  
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");
  
	// Append to svg.
	svg.append("svg:g")
		.attr("class","axis")
		.attr("transform", "translate(0," + (height - margin.bottom) + ")")
		.call(xAxis);
	
	svg.append("svg:g")
		.attr("class","axis")
		.attr("transform", "translate(" + (margin.left) + ",0)")
		.call(yAxis)
        .append("text")
            .attr("x", - 17)
            .attr("y", - 17)
            .attr("transform", "rotate(-90)")
            .attr("fill", "#000")
            .text("Speed, m/s");
                
    // Line colors.
    var colors = {
                            Avg: "#1b9e77",
                            High: "#d95f02",
                            Low: "#7570b3"
                        }
     
     // Draw the line of doom.
    var type = svg.selectAll(".type")
        .data(types)
        .enter().append("g")
        .attr("class", "type");
        
    type.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return lineGen(d.values); })
        .attr("stroke", function(d) { return colors[d.id]; })
		.attr("stroke-width", 1)
		.attr("fill", "none");
    
	// Handle mouseovers.	 
	var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

	// Draw the vertical line.  
    mouseG.append("path")
		.attr("y", 20)
		.attr("class", "mouse-line")
		.attr("transform", "translate(" + 0 + ",0)")
		.style("stroke", "black")
		.style("stroke-width", "1px")
		.style("opacity", "0");
      
    var lines = document.getElementsByClassName("line");
    var mousePerLine = mouseG.selectAll(".mouse-per-line")
		.data(types)
		.enter()
		.append("g")
		.attr("class", "mouse-per-line");
	
	// Add the circle to the mouseover.
    mousePerLine.append("circle")
		.attr("r", 7)
		.style("fill", function(d) {
			return colors[d.id];
		})
		.style("opacity", "0");
	
	// Add the circle to the mouseover.
    mousePerLine.append("rect")
		.attr("width", 70)
		.attr("height", 20)
		.attr("transform", "translate(8, -10)")
		.style("fill", "#EEEEEE")
		.style("opacity", "0");
		
	// Add tooltip text. 
    mousePerLine.append("text")
		.attr("transform", "translate(10, 5)");

    // Append a rect to catch mouse movements on canvas.
    mouseG.append("svg:rect")
		.attr("x", margin.left - 5)
		.attr("width", width - margin.left - margin.right) 
		.attr("height", height)
		.attr("fill", "none")
		.attr("pointer-events", "all")

	  // Hide mouseover elements on mouseout. 
	.on("mouseout", function() {
		d3.select(".mouse-line")
			.style("opacity", "0");
		d3.selectAll(".mouse-per-line circle")
			.style("opacity", "0");
		d3.selectAll(".mouse-per-line text")
			.style("opacity", "0");
		d3.selectAll(".mouse-per-line rect")
			.style("opacity", "0");
		d3.selectAll(".tooltip")
			.style("opacity", "0");
	})
	 
	// Show them on mousein.
	.on("mouseover", function() { 
		d3.select(".mouse-line")
			.style("opacity", "1");
		d3.selectAll(".mouse-per-line circle")
			.style("opacity", "1");
		d3.selectAll(".mouse-per-line text")
			.style("opacity", "1");
		d3.selectAll(".mouse-per-line rect")
			.style("opacity", "1");
		d3.selectAll(".tooltip")
			.style("opacity", "1");
	})
	
	// When it moves, display the appropriate data.
	.on("mousemove", function() {
		var mouse = d3.mouse(this);
		d3.select(".mouse-line")
		.attr("d", function() {
			var d = "M" + mouse[0] + "," + height + 20;
			d += " " + mouse[0] + "," + 9;
			return d;
		});

        d3.selectAll(".mouse-per-line")
		.attr("transform", function(d, i) {
			var xDate = xScale.invert(mouse[0]),
			bisect = d3.bisector(function(d) {
				return d.Datum; 
			}).right;
			idx = bisect(d.values, xDate);
            
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
				target = Math.floor((beginning + end) / 2);
				pos = lines[i].getPointAtLength(target);
				
				if ((target === end || target === beginning) && pos.x !== mouse[0])
					break;
				if (pos.x > mouse[0])      
					end = target;
				else if (pos.x < mouse[0]) 
					beginning = target;
				else 
					break;
            }
            
            // Add text to the onhover circles.
            d3.select(this).select("text")
				.text(yScale.invert(pos.y).toFixed(2) + " m/s");
            
			// Add exact date tooltip.
            d3.select(".tooltip")
                .select("text")
				.attr("x", mouse[0])
				.attr("transform", "translate(-30 , -15)")
                .text(String(xDate).substr(0, 11));
            
            return "translate(" + mouse[0] + "," + pos.y +")";
		});
	});

     // Legend.
    var legend = svg.selectAll(".legend")
		.data(types)
		.enter()
		.append("g")
		.attr("class", "legend");
     
	 // Legend constants.
	const LEGEND_OFFSET = 30;
	const LEGEND_INTERSPACING = 30;
     
	// Colored circles of the legend. 	
	legend.append("circle")
		.attr("cx", width - 10)
		.attr("cy", function(d, i) {
			return LEGEND_OFFSET + i * LEGEND_INTERSPACING;
		})
		.attr("r", 7)
		.style("fill", function(d) {
			return colors[d.id];
		});

	// Add line type text to the legend. 	
	legend.append("text")
		.attr("x", width)
		.attr("y", function(d, i) {
			return 26 + (i * LEGEND_INTERSPACING) + 9;
		})
		.text(function(d) {
			return d.id;
		});
      
	var tooltip = svg.selectAll(".legend")
        .append("g")
        .attr("class", "tooltip")
        .append("text")
        .attr("x", width - 100 - margin.right)
        .attr("y", 20);
}

/* Takes the date from the raw data and makes it suitable for the JS Date object. */
function makeDate(dateString){
	dateString = dateString.trim();
	return new Date((dateString.substr(0,4) + "," + dateString.substr(4,2) + "," + dateString.substr(6,2)));
}