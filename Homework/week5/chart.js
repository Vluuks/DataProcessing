/* Renske Talsma
	10896503
	https://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935
	nothing
*/

/* Wait until page is ready. */
$('document').ready(function(){
	initCanvas();
});



function loadData(){

	// get multiple files

}


function initCanvas(){
		
	var data = [{
		"sale": "202",
		"year": "2000"
	}, {
		"sale": "215",
		"year": "2001"
	}, {
		"sale": "179",
		"year": "2002"
	}, {
		"sale": "199",
		"year": "2003"
	}, {
		"sale": "134",
		"year": "2003"
	}, {
		"sale": "176",
		"year": "2010"
	}];

	// Find chart svg
	var svg = d3.select("#chart"),
		width = 1000,
		height = 500,
		margins = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 50
		};
		
	var padding = 10;
	
	// Create scales	for X and Y axes
	var yScale = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([134,215]);
	
	// Create X scale
	// This will later depend on the chosen year
	var mindate = new Date(2016,0,1),
		maxdate = new Date(2016,11,31);
		
	var xScale = d3.time.scale()
		.domain([mindate, maxdate])    // values between for month of january
		.range([margins.left, width - margins.right]);   // map these the the chart width = total width minus padding at both sides
  
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
		.attr("transform", "translate(0," + (height - margins.bottom) + ")")
		.call(xAxis);
	
	svg.append("svg:g")
		.attr("class","axis")
		.attr("transform", "translate(" + (margins.left) + ",0)")
		.call(yAxis);
	
	// Function to draw the line
	// I NEVER SAID WHICH DATA TO USE HOW DOES IT KNOW
	var lineGen = d3.svg.line()
		.x(function(d) {
		return xScale(d.year);
		})
		.y(function(d) {
		return yScale(d.sale);
		});
		
	svg.append('svg:path')
		.attr('d', lineGen(data))
		.attr('stroke', 'green')
		.attr('stroke-width', 2)
		.attr('fill', 'none');
	

	
}






























