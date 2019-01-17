function makelinechart(country, data){

years = Object.keys(data)
// console.log(country);

lineDict = {}
value = Object.values(data)
value.forEach(function(v, i){
  lineDict[years[i]] = v[country]["Share of renewable energy in gross final energy consumption"];

console.log(lineDict);
})

drawlinechart();
function drawlinechart(){

  // setup margind of line chart
  var margin = {top: 20, right:20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var svgHeight = 400;
  var svgWidth = 600;

  var svg = d3.select('#line')
     .append('svg')
     .attr("width", svgWidth)
     .attr("height", svgHeight);

  var g = svg.append("g")
     .attr("transform",
       "translate(" + margin.left + "," + margin.top + ")"
     );

     // console.log(Object.keys(lineDict));
     // console.log(Object.values(lineDict));

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


  // setup bottom axis
     g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("")))
        // .select(".domain");

  // setup left axis
      g.append("g")
         .call(d3.axisLeft(y))
         .append("text")
         .attr("fill", "#000")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .attr("text-anchor", "end")
         .text("Percentage of total");

  // setup path
         g.append("path")
         .datum(Object.keys(lineDict))
         .attr("fill", "none")
         .attr("stroke", "steelblue")
         .attr("stroke-linejoin", "round")
         .attr("stroke-linecap", "round")
         .attr("stroke-width", 3)
         .attr("d", line);

         // var scatter = g.selectAll("circle")
         //           .data(lineDict)
         //           .enter()
         //           .append("circle")
         //           .attr("cx", function(d) {
         //              return x(d[1]);
         //              })
         //           .attr("cy", function(d) {
         //              return y(d[2]);
         //              })
         //           .attr("r", 10)
         //           .attr("fill", "maroon");


         year = "2015";

         makeBarChart(year, country, data);
}
// ------------------------------------------------------------------------------------------------------------------------------------------
// makeBarChart()
//
// function makeBarChart(){
//
// console.log(data);
// years = Object.keys(data)
// barDict = {}
// barDict[years[i]]
//
// }

}
