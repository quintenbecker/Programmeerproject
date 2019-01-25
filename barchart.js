function makeBarChart(year, country, data, circ){

  // let barChartDict = {}
  console.log(country);
  let barChartDict = {
    "Share of renewable energy in electricity": data[year][country]["Share of renewable energy in electricity"],
    "Share of renewable energy in heating and cooling": data[year][country]["Share of renewable energy in heating and cooling"],
    "Share of renewable energy in transport": data[year][country]["Share of renewable energy in transport"]
    };

  // barChartList = []
  // barChartList.push(data[year][country]["Share of renewable energy in electricity"])
  // barChartList.push(data[year][country]["Share of renewable energy in heating and cooling"])
  // barChartList.push(data[year][country]["Share of renewable energy in transport"])

  // console.log(d3.selectAll(".rects")._groups[0].length);

  console.log(barChartDict);

  if (d3.selectAll(".rects")._groups[0].length == 0){
    drawBarChart(barChartDict);
  } else {
    updateBarFunction(barChartDict);
  }
  // console.log(barChartDict);
  // console.log(Object.values(barChartDict));
  // console.log(["Share of renewable energy in electricity"]);
  // console.log(barChartDict.length);

}

function drawBarChart(barChartDictT){

  // setup margind of line chart
  var margin = {top: 20, right:100, bottom: 10, left: 50},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      middle = (width - margin.right)/2 + margin.left /2

 var svgHeight = 400;
 var svgWidth = 600;
 var barPadding = 3;


  // scale x and y axis to boxplot data and given marges
  var yScale = d3.scaleLinear()
    .range([svgHeight - margin.top, margin.bottom])
    .domain([0, 100])

  var xvars = ['Electricity', 'Heating and cooling', 'Transport']

  var xScaleBars = d3.scaleLinear()
    .range([margin.left, svgWidth - margin.right])
    .domain([0, 3])

  var xScale = d3.scaleBand()
    .range([margin.left, svgWidth - margin.right])
    .domain(xvars.map(function(d) {return d}))


    var svg = d3.select('#bar')
       .attr("width", svgWidth)
       .attr("height", svgHeight);

       // make Y-axe
     var yAxis = svg.append("g")
         .attr("transform", "translate(" + margin.left + "," + "0" + ")")
         .call(d3.axisLeft(yScale));

      // make X-axis
     var xAxis = svg.append('g')
         .attr("transform", "translate(0, 380)")
         .call(d3.axisBottom(xScale))

         // console.log(xScale(barChartList[0]));

     list = Object.values(barChartDictT)
     // console.log(list);

     var rects = svg.selectAll("rect")
               .data(list)
               .enter()
               .append("rect")
               .attr("y", function(d) {
                return yScale(d) ;  //Height minus data value
                })
               .attr("width", width / 3  - barPadding)
               .attr("height", function(d) {
                return height - yScale(d) + margin.bottom ;  //Just the data value
                })
               .attr("x", function(d, i) {
                    return xScaleBars(i) + barPadding;  //Bar width of 20 plus 1 for padding
                  })
               .attr("fill", "steelblue")
               .attr("class", "rects")
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

function updateBarFunction(barData) {

  // setup margind of line chart
  var margin = {top: 20, right:100, bottom: 10, left: 50},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      middle = (width - margin.right)/2 + margin.left /2

 var svgHeight = 400;
 var svgWidth = 600;
 var barPadding = 3;

  // scale x and y axis to boxplot data and given marges
  var yScale = d3.scaleLinear()
    .range([svgHeight - margin.top, margin.bottom])
    .domain([0, 100])

  var xvars = ['Electricity', 'Heating and cooling', 'Transport']

  var xScaleBars = d3.scaleLinear()
    .range([margin.left, svgWidth - margin.right])
    .domain([0, 3])

  var newRects = d3.select("#bar").selectAll(".rects").data(Object.values(barData))
  console.log(newRects);
  console.log(Object.values(barData));

  // newRects.enter().append("rect");
  //
  // newRects.exit().remove()

  newRects
        .transition()
        .duration(500)
        .attr("y", function(d) {
         return yScale(d) ;  //Height minus data value
         })
        // .attr("width", width / 3  - barPadding)
        .attr("height", function(d) {
         return height - yScale(d) + margin.bottom ;  //Just the data value
         })
        // .attr("x", function(d, i) {
        //      return xScaleBars(i) + barPadding;  //Bar width of 20 plus 1 for padding
        //    })
        .attr("fill", "steelblue")
        .attr("class", "rects")

}
