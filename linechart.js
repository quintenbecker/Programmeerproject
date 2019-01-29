function makelinechart(country, data){

console.log(country);


years = Object.keys(data)

lineDict = {}
value = Object.values(data)
value.forEach(function(v, i){
  lineDict[years[i]] = v[country]["Share of renewable energy in gross final energy consumption"];
})

if ((d3.selectAll(".line")["_groups"][0].length) == 0){
  makeSvg()
  drawlinechart()
  console.log("HALLOHALLO");
}
else {
  updateFunction()
}

// d3.select("#selected-dropdown").text("first");
//
// d3.select("select")
//   .on("change",function(d){
//     var selected = d3.select("#d3-dropdown").node().value;
//     console.log( selected );
//     d3.select("#selected-dropdown").text(selected);
// })

function makeSvg() {
  // setup margind of line chart
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

function drawlinechart(){

  // setup margind of line chart
  var margin = {top: 20, right:20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // x and y scales
   var x = d3.scaleLinear()
     .range([0, width])
     // .domain([2007, 201])

   var y = d3.scaleLinear()
     .range([height, 0])

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
         .attr("stroke", "rgb(0, 179, 0)")
         .attr("stroke-linejoin", "round")
         .attr("stroke-linecap", "round")
         .attr("stroke-width", 3)
         .attr("d", line);

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
         .attr("fill", "#FF005A")
         .on("click", function(d){
              makeBarChart(d, country, data);
         })
         // year = "2015";
         //
         // makeBarChart(year, country, data);
}

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

  console.log(lineDict);
  console.log(d3.select("#line").select("g").selectAll(".line"));

  var newLine = d3.select("#line").select("g").selectAll(".line").datum(Object.keys(lineDict))
  newLine
      .transition()
      .duration(500)
      .attr("d", line)
      .attr("class", "line")
      .style("fill", "none")
      .style("stroke", "rgb(0, 179, 0)");

  var newCircle = d3.select("#line").select("g").selectAll(".circle").data(Object.keys(lineDict));
  newCircle
         .transition()
         .duration(1200)
         .attr("d", line)
         .attr("cx", function(d, i) { return x(d) })
         .attr("cy", function(d) { return y(lineDict[d]) })
         .attr("r", 5)
         .attr("fill", "#FF005A")

  newCircle.on("click", function(d){
    makeBarChart(d, country, data);
  })

  d3.select("#yAxis").remove()

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
