function updateFunction() {

// setup margind of line chart
var margin = {top: 20, right:20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width])

  var y = d3.scaleLinear()
    .range([height, 0])

  var line = d3.line()
     .x(function(d) { return x(d)})
     .y(function(d) { return y(lineDict[d])})
     x.domain(d3.extent(Object.keys(lineDict), function(d) { return +d}));
     y.domain(d3.extent(Object.values(lineDict), function(d) { return +d }));

      var newLine = d3.select(".line").datum(lineDict);
      newLine.transition()
          .duration(500)
          .attr("d", line)
          .style("fill", "none")
          .style("stroke", "black");

      var newCircle = d3.selectAll(".circle").data(lineDict);
      newCircle.transition()
             .duration(500)
             .attr("d", line)
             .attr("cx", function(d, i) { return x(d) })
             .attr("cy", function(d) { return y(lineDict[d]) })
             .attr("r", 5)
             .attr("fill", "#FFA500")

}
