function makeBarChart(year, country, data){

  barChartDict = {}

  var barChartDict = {
    "Share of renewable energy in electricity": data[year][country]["Share of renewable energy in electricity"],
    "Share of renewable energy in heating and cooling": data[year][country]["Share of renewable energy in heating and cooling"],
    "Share of renewable energy in transport": data[year][country]["Share of renewable energy in transport"]
    };

  barChartList = []
  barChartList.push(data[year][country]["Share of renewable energy in electricity"])
  barChartList.push(data[year][country]["Share of renewable energy in heating and cooling"])
  barChartList.push(data[year][country]["Share of renewable energy in transport"])
  drawBarChart(barChartDict);

  console.log(barChartDict);
  console.log(Object.values(barChartDict));
  console.log(["Share of renewable energy in electricity"]);
  // console.log(barChartDict.length);

}

function drawBarChart(barChartDict){

  // setup margind of line chart
  var margin = {top: 10, right:100, bottom: 10, left: 30},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      middle = (width - margin.right)/2 + margin.left /2

 var svgHeight = 400;
 var svgWidth = 600;
 var barPadding = 1;


  // scale x and y axis to boxplot data and given marges
  var yScale = d3.scaleLinear()
    .range([svgHeight - margin.top, margin.bottom])
    .domain([0, 100])

  var xvars = ['Electricity', 'Heating and cooling', 'Transport']

  var xScale = d3.scaleBand()
    .range([margin.left, width - margin.right])
    .domain(xvars.map(function(d) {return d}))


    var svg = d3.select('#bar')
       .attr("width", svgWidth)
       .attr("height", svgHeight);

       // make Y-axe
     var yAxis = svg.append("g")
         .attr("transform", "translate(25," + "-20" + ")")
         .call(d3.axisLeft(yScale));

      // make X-axis
     var xAxis = svg.append('g')
         .attr("transform", "translate(40, 380)")
         .call(d3.axisBottom(xScale))

         // console.log(xScale(barChartList[0]));

     var rects = svg.selectAll("rect")
               .data(barChartDict)
               .enter()
               .append("rect")
               .attr("y", function(d) {
                return (yScale((Object.values(d))));  //Height minus data value
                })
               .attr("width", width / 3 + barPadding)
               .attr("height", function(d) {
                return height - yScale(d) - margin.bottom;  //Just the data value
                })
               .attr("x", function(d, i) {
                    return xScale((Object.keys(d)));  //Bar width of 20 plus 1 for padding
                  })
               .attr("fill", "steelblue");
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
