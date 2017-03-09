// ** Update data section (Called from the onclick)
function updateData() {

    // Get the data again
    d3.csv("data-alt.csv", function(error, data) {
       	data.forEach(function(d) {
	    	d.date = parseDate(d.date);
	    	d.close = +d.close;
	    });

    	// Scale the range of the data again 
    	x.domain(d3.extent(data, function(d) { return d.date; }));
	    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Select the section we want to apply our changes to
    var svg = d3.select("body").transition();

    // Make the changes
        svg.select(".line")   // change the line
            .duration(750)
            .attr("d", valueline(data));
        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);

    });
}
