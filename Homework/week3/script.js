getJSONfile(setUpBarChart);
// duizend ton = 1 miljoen kilo

function getJSONfile(callback){
    d3.json("./banaan_20.json", function(rawData) {
        callback(rawData);
    });
}

function logDataDebug(data){
    
    console.log(data);
    
    
    for(var i = 0; i < data.length; i ++){
        console.log(data[i].thousandmetrictons);
    }
}

function setUpBarChart(data){
    
    logDataDebug(data);
    
    // Define width and height of the SVG and margins
    var margin = {top: 20, right: 40, bottom: 60, left: 40},
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
 
 
    // Create a scaling function for X and Y
    var scalingFunctionY = d3.scale.linear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d) { return +d.thousandmetrictons; })]);
    var scalingFunctionX = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1)
        .domain(data.map(function(d) { return d.country; }));
    
    // Init axis
    var xAxis = d3.svg.axis()
        .scale(scalingFunctionX)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(scalingFunctionY)
        .orient("left");
    
    
    // Find chart and set properties
    var svg = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // Append x and y axis to chart
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Append bars
    svg.selectAll(".bar")
        .data(data)
            .enter()
            .append("g") // add the bar for every data entry
                .append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return scalingFunctionX(d.country); })
                    .attr("y", function(d) { return scalingFunctionY(+d.thousandmetrictons); })
                    .attr("height", function(d) { return height - scalingFunctionY(+d.thousandmetrictons); })
                    .attr("width", scalingFunctionX.rangeBand())
                    .style("fill", "#fcc858")
                    .on("mouseover", function() { console.log("MouseOver"); d3.select(this).style("fill", "firebrick"); console.log(this); })
                    .on("mouseout", function(d, i) { d3.select(this).style("fill", "#fcc858") });

    svg.selectAll(".bartext")
        .data(data)
            .enter()
            .append("text")
            .attr("class", "barlabel")
            .attr("x", function(d) { return scalingFunctionX(d.country); })
            .attr("y", function(d) { return scalingFunctionY(+d.thousandmetrictons) - 2; })
            .attr("text-anchor", "start")
            //.attr("transform", "translate")
            //.attr("transform", "rotate(-90)")
            .text(function(d) { return +d.thousandmetrictons; });
}
