function makelinechart(country, data){

years = Object.keys(data)

// make dictionary with the right data
lineDict = {}
value = Object.values(data)
value.forEach(function(v, i){
  lineDict[years[i]] = v[country]["Share of renewable energy in gross final energy consumption"];
})

// creates first linechart if no linechart exists, otherwise update linechart
if ((d3.selectAll(".line")["_groups"][0].length) == 0){
  makeSvg()
  drawLineChart()
}
else {
  updateFunction()
}

// makes svg for linechart
function makeSvg() {

  // setup margins for svg
  var margin = {top: 20, right:20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var svgHeight = 400;
  var svgWidth = 600;

  var svg = d3.select('#line')
     .attr("width", svgWidth)
     .attr("height", svgHeight);

  var g = svg.append("g")
     .attr("transform",
       "translate(" + margin.left + "," + margin.top + ")"
     );
}

// draws linechart
function drawLineChart(){

  // setup margind of line chart
  var margin = {top: 20, right:20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // x and y scales
   var x = d3.scaleLinear()
     .range([0, width])

   var y = d3.scaleLinear()
     .range([height, 0])

   // setup points for line
   var line = d3.line()
      .x(function(d) { return x(d)})
      .y(function(d) { return y(lineDict[d])})
      x.domain(d3.extent(Object.keys(lineDict), function(d) { return +d}));
      y.domain(d3.extent(Object.values(lineDict), function(d) { return +d }));

    var lineCircle = d3.line()
       .x(function(d, i) { return x(i)})
       .y(function(d) { return y(d)})
       x.domain(d3.extent(Object.keys(lineDict), function(d) { return +d}));
       y.domain(d3.extent(Object.values(lineDict), function(d) { return +d }));


       // setup bottom axis
     d3.select("#line").select("g").append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("")))
        // .select(".domain");

        // setup left axis
     d3.select("#line").select("g").append("g")
         .call(d3.axisLeft(y)).attr("id", "yAxis")
         .append("text")
         .attr("fill", "#000")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .attr("text-anchor", "end")
         .text("Percentage of total");

         // setup path
         d3.select("#line").select("g").append("path")
         .datum(Object.keys(lineDict))
         .attr("fill", "none")
         .attr("class", "line")
         .attr("stroke", "rgb(51, 153, 102)")
         .attr("stroke-linejoin", "round")
         .attr("stroke-linecap", "round")
         .attr("stroke-width", 3)
         .attr("d", line);

         // make tooltip for scatterplot
         var toolTip = d3.tip()
         .attr("class", "d3-tip")
         .offset([-8, 2])
         .html(function(d){ return lineDict[d]})

         d3.select("#line").select("g").call(toolTip);

         // makes scatterpolot for given data on linechart
         var scatter = d3.select("#line").select("g").selectAll("circle")
         .data(Object.keys(lineDict))
         .enter()
         .append("circle")
         .attr("class", "circle")
         .attr("r", 5)
         .attr("cx", function(d) {
              return x(d);
              })
         .attr("cy", function(d) {
              return y(lineDict[d]);
            })
         .attr("fill", "#ff9900")
         .on("click", function(d){
              makeBarChart(d, country, data)})
         .on('mouseover', function(d){
           toolTip.show(d)
         })
         .on('mouseout', function(d){
           toolTip.hide(d)
         })
}

// updates linechart
function updateFunction() {

  // setup margins svg
  var margin = {top: 20, right:20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // x and y scales
  var x = d3.scaleLinear()
      .range([0, width])

  var y = d3.scaleLinear()
    .range([height, 0])

  // setup points for line
  var line = d3.line()
     .x(function(d) { return x(d)})
     .y(function(d) { return y(lineDict[d])})
     x.domain(d3.extent(Object.keys(lineDict), function(d) { return +d}));
     y.domain(d3.extent(Object.values(lineDict), function(d) { return +d }));

  // make new line
  var newLine = d3.select("#line").select("g").selectAll(".line").datum(Object.keys(lineDict))
  newLine
      .transition()
      .duration(500)
      .attr("d", line)
      .attr("class", "line")
      .style("fill", "none")
      .style("stroke", "rgb(51, 153, 102)");

  // make new circle
  var newCircle = d3.select("#line").select("g").selectAll(".circle").data(Object.keys(lineDict));
  newCircle
         .transition()
         .duration(1200)
         .attr("d", line)
         .attr("cx", function(d, i) { return x(d) })
         .attr("cy", function(d) { return y(lineDict[d]) })
         .attr("r", 5)
         .attr("fill", "#ff9900")

  newCircle.on("click", function(d){
    makeBarChart(d, country, data);
  })

  d3.select("#yAxis").remove()

  // make axis
  var newAxis =  d3.select("#line").select("g")
  newAxis
        .append("g")
        .call(d3.axisLeft(y)).attr("id", "yAxis")
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Percentage of total");

  }
}
