getJSONfile(constructChart);
// duizend ton = 1 miljoen kilo

function getJSONfile(callback){
    d3.json("./test.json", function(rawData) {
        callback(rawData);
    });
}


function constructChart(data){
    
    console.log(data);
	
    // Define width and height of the SVG and margins
    var margin = {top: 20, right: 40, bottom: 60, left: 40},
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

	// Find chart and set properties
	var svg = d3.select(".chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
    // Transpose the data into layers, with the regio on the x axis and the types of coverage on the Y
    var dataSetY = d3.layout.stack()(["Infrastructuur", "Bebouwing", "Semibebouwing", "Recreatie", "Agrarisch", "Natuur", "Binnenwater", "Buitenwater"].map(function(type) {
        return data.map(function(d) {
            return {x: (d.regio), y: +d[type]};
        });
    }));

    // Set X and Y scaling.
    var x = d3.scale.ordinal()
    .domain(dataSetY[0].map(function(d) { return d.x; }))
    .rangeRoundBands([10, width-10], 0.02);

    var y = d3.scale.linear()
    .domain([0, d3.max(dataSetY, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
    .range([height, 0]);

    // Set the colors for the different kinds of coverage.
	var barColors = ["#747d8c", "#993710", "#cae216", "#a35b99", "#f4bc77", "#4c7a3a", "#77e1f4", "#747d8c"];

    // Define and draw axes
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5)
      .tickSize(-width, 0, 0)
      .tickFormat( function(d) { return d } );

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
      
    // Create the bars
    // Create groups for each series, rects for each segment 
    var groups = svg.selectAll("g.cost")
      .data(dataSetY)
      .enter().append("g")
      .attr("class", "cost")
      .style("fill", function(d, i) { return barColors[i]; });

    var rect = groups.selectAll("rect")
      .data(function(d) { return d; })
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y0 + d.y); })
      .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
      .attr("width", x.rangeBand())

        
    }