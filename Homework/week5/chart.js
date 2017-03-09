/* Renske Talsma
	10896503
	https://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935
	nothing
*/


/* Global dict to store data */
var dataDict = [];


/* Wait until page is ready. */
$('document').ready(function(){
    
    // Load all of the data. 
        queue()
            .defer(d3.json, 'Data/data2015.json')
            .defer(d3.json, 'Data/data2016.json')
            .await(callbackInit);
        
});


function callbackInit(error, data2015, data2016){

	if(error)
		throw error;
	
	console.log(data2015);
	
	// Store globally
	dataDict[0] = data2015;
	dataDict[1] = data2016;
	
	// console.log("callbackint");
	// console.log(data2015);
	// console.log(dataDict[0]);
	
	// And set dates as well.
	// dataDict['2015'].dateDomain = [new Date(2015,0,1), new Date(2015,11,31)];
	// dataDict['2016'].dateDomain = [new Date(2016,0,1), new Date(2016,11,31)];
	
	// Match data to chart.
	setData();
	
}



function setData(){
	
	var dataYear = $('#yearChoice').val();
	var dataDomain = [];

	switch(dataYear){
		case "2015":
			data = dataDict[0];
			dataDomain =  [new Date(2015,1,1), new Date(2015,11,31)];
			break;
		case "2016":
			data = dataDict[1];
			dataDomain =  [new Date(2016,1,1), new Date(2016,11,31)];
			break;
		default:
			data = dataDict[0];
			dataDomain =  [new Date(2015,1,1), new Date(2015,11,31)];
			break;
	}
    
	console.log(dataDict);
	console.log(data);
	
	// Initialize canvas with the chosen data.
	initCanvas(data, dataDomain)
}


function initCanvas(data, dataDomain){

	console.log("canvint");
	console.log(data);
	console.log(dataDomain);
    			dataDomain =  [new Date(2016,1,1), new Date(2016,11,31)];

	/* SVG INITIALIZATION */
	
    var margin = {top: 10, right: 10, bottom: 10, left: 25};
    var width = 1900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;   
        
    var svg = d3.select(".container")
        .append("svg")
        .attr("class", "linechart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		        
    /* DATA AND SCALES */
	
	// Parse data into columns.
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
        .domain([0, 135]); // TODO
	
	var mindate = new Date(2016,0,1), // TODO
		maxdate = new Date(2016,11,31); // TODO
		
	var xScale = d3.time.scale()
		.domain(dataDomain)    // values between for month of january
		.range([margin.left, width - margin.right]);   // map these the the chart width = total width minus padding at both sides
  
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
            .attr("x", -75 - margin.left)
            .attr("y", 20)
            .attr("transform", "rotate(-90)")
            .attr("fill", "#000")
            .text("Wind speed, m/s");
                
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
		.attr('stroke-width', 1)
		.attr('fill', 'none');
    
    
     // Mouseover
	 
	var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
	  //.attr("transform", "translate(" + -4 + ",0)")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(types)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", function(d) {
        return colors[d.id];
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height + 20;
            d += " " + mouse[0] + "," + 9;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            //console.log(width/mouse[0])
            var xDate = xScale.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.Datum; }).right;
                idx = bisect(d.values, xDate);
            
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }
            
            d3.select(this).select('text')
              .text(yScale.invert(pos.y).toFixed(2));
              
            return "translate(" + mouse[0] + "," + pos.y +")";
          });
      });
	 
	 
	 /************************************************************************/
     
     // Legend.
     var legend = svg.selectAll('.legend')
      .data(types)
      .enter()
      .append('g')
      .attr('class', 'legend');
     
     legend.append('rect')
      .attr('x', width - 100 - margin.right)
      .attr('y', function(d, i) {
        return 50 + i * 20;
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) {
        return colors[d.id];
      });

    legend.append('text')
      .attr('x', width - 80 - margin.right)
      .attr('y', function(d, i) {
        return 50 + (i * 20) + 9;
      })
      .text(function(d) {
        return d.id;
      });
     
}


/* Takes the date from the raw data and makes it suitable for the JS Date object. */
function makeDate(dateString){

	dateString = dateString.trim();
	return new Date((dateString.substr(0,4) + "," + dateString.substr(4,2) + "," + dateString.substr(6,2)));

}