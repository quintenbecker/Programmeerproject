function makeBarChart(year, country, data){


console.log(data);
year = "2008"
barChartList = []
barChartList.push(data[year][country]["Share of renewable energy in electricity"])
barChartList.push(data[year][country]["Share of renewable energy in heating and cooling"])
barChartList.push(data[year][country]["Share of renewable energy in transport"])
console.log(barChartList);
drawBarChart(barChartList);

}

function drawBarChart(barChartList){

  // setup margind of line chart
  var margin = {top: 20, right:20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

 var svgHeight = 400;
 var svgWidth = 600;
 var barPadding = 10;
 var marginbottom = 20;

  // scale x and y axis to boxplot data and given marges
  var yScale = d3.scaleLinear()
    .range([0, svgHeight])
    .domain([0, 200])

  var xScale = d3.scaleLinear()
    .range([width, margin.left])
    .domain([0, 3])


    var svg = d3.select('#bar')
       .append('svg')
       .attr("width", svgWidth)
       .attr("height", svgHeight);

       // make Y-axe
     var yAxis = svg.append("g")
         .attr("transform", "translate(20," + "0" + ")")
         .call(d3.axisLeft(yScale));

 console.log(xScale(barChartList[0]));

  var rects = svg.selectAll("rect")
               .data(barChartList)
               .enter()
               .append("rect")
               .attr("y", function(d) {
                return yScale(d);  //Height minus data value
                })
               .attr("width", width / barChartList.length - barPadding)
               .attr("height", function(d) {
                return height - yScale(d) - marginbottom;  //Just the data value
                })
               .attr("x", function(d, i) {
                    return xScale(i);  //Bar width of 20 plus 1 for padding
                  })
               .attr("fill", "teal");
               // .on('mouseover', tool_tip.show)
               // .on('mouseenter', function(d){
               //   // tool_tip.show;
               //   colour.html(d)
               //   d3.select(this).style('fill', "maroon")
               //
               // })
               //
               // .on('mouseout', tool_tip.hide)
               // .on('mouseout', function(d){
               //   colour.transition()
               //   d3.select(this).style('fill', "teal")
               // })
}
