/* Renske Talsma
	10896503
	https://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935
	nothing
*/

/* Wait until page is ready. */
$('document').ready(function(){
    
    // Load all of the data. 
  
        queue()
            .defer(d3.json, 'Data/data2016.json')
            .defer(d3.json, 'Data/data2015.json')
            .await(initCanvas);
        
});



function checkYear(){
    
    // check which year was selected
    // adjust text
    //  pass correct json on to canvas
    
    // MKE A COOL AS FUCK TRANSITION
    
}


function initCanvas(error, data2016, data2015){
    
    console.log(data2016);
    console.log(data2015);
    
    if(error)
        throw error;
    
    // sample test data
	var data = data2016;
        
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
		        
    // Parse the data
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
  
   
    // Create scales	for X, Y and Z
	var yScale = d3.scale.linear()
        .range([height - margin.top, margin.bottom])
        .domain([0, 135]);
	
	var mindate = new Date(2016,0,1),
		maxdate = new Date(2016,11,31);
		
	var xScale = d3.time.scale()
		.domain([mindate, maxdate])    // values between for month of january
		.range([margin.left, width - margin.right]);   // map these the the chart width = total width minus padding at both sides
  
    var zScale = d3.scale.ordinal(d3.schemeCategory10)
        .domain(types.map(function(c) { return c.id; }));
            
    // Function to draw the line
	var lineGen = d3.svg.line()
		.x(function(d) {
            console.log("date" + d.Date);
            return xScale(makeDate(d.Date));
		})
		.y(function(d) {
            console.log(d.Value);
            return yScale(d.Value);
		});
  
	// Create axes
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
  
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");
  
	// Append to svg
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
                
    // Line colors
    var colors = {
                            Avg: "#1b9e77",
                            High: "#d95f02",
                            Low: "#7570b3"
                        }
     
     // Draw the line of doom
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
     

     
     
     
     
     
     // Legend
     var legend = svg.selectAll('.legend')
      .data(types)
      .enter()
      .append('g')
      .attr('class', 'legend');
     
     legend.append('rect')
      .attr('x', width - 60 - margin.right)
      .attr('y', function(d, i) {
        return i * 20;
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) {
        return colors[d.id];
      });

    legend.append('text')
      .attr('x', width - 45 - margin.right)
      .attr('y', function(d, i) {
        return (i * 20) + 9;
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