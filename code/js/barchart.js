function makeBarChart(year, country, data, circ){

  // make dicitonary of given data
  let barChartDict = {
    "Share of renewable energy in electricity": data[year][country]["Share of renewable energy in electricity"],
    "Share of renewable energy in heating and cooling": data[year][country]["Share of renewable energy in heating and cooling"],
    "Share of renewable energy in transport": data[year][country]["Share of renewable energy in transport"]
    };

  // if no barchart, draw new barchart. Otherwise update.
  if (d3.selectAll(".rects")._groups[0].length == 0){
    drawBarChart(barChartDict);
    }
  else {
    updateBarFunction(barChartDict);
    }
}


function drawBarChart(barChartDictT){

  // setup margind of line chart
  var margin = {top: 20, right:100, bottom: 10, left: 50},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      middle = (width - margin.right)/2 + margin.left /2

 var svgHeight = 400;
 var svgWidth = 600;
 var barPadding = 20;
 var domainMin = 0;
 var domainMax = 100;

// setup tooltip
 var tooltip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-8, 0])
    .html(function(d) { return d});


  // scale x and y axis to boxplot data and given marges
  var yScale = d3.scaleLinear()
    .range([svgHeight - margin.top, margin.bottom])
    .domain([domainMin, domainMax])

  // setup x-axis labels
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

     svg.call(tooltip);

     list = Object.values(barChartDictT)

     // crerate barchart
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
               .attr("fill", "rgb(51, 153, 102)")
               .attr("class", "rects")
               .on('mouseover', function(d){
                 tooltip.show(d);
               })
               .on('mouseout', tooltip.hide)
}

// update existing barcahrt
function updateBarFunction(barData) {

  // setup margind of line chart
  var margin = {top: 20, right:100, bottom: 10, left: 50},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      middle = (width - margin.right)/2 + margin.left /2

 var svgHeight = 400;
 var svgWidth = 600;
 var barPadding = 3;
 var domainMin = 0;
 var domainMax = 100;

  // scale x and y axis to boxplot data and given marges
  var yScale = d3.scaleLinear()
    .range([svgHeight - margin.top, margin.bottom])
    .domain([domainMin, domainMax])

  var xvars = ['Electricity', 'Heating and cooling', 'Transport']

  var xScaleBars = d3.scaleLinear()
    .range([margin.left, svgWidth - margin.right])
    .domain([0, 3])

  // create new barchart
  var newRects = d3.select("#bar").selectAll(".rects").data(Object.values(barData))

  // update barchart with duration
  newRects.transition()
          .duration(500)
          .attr("y", function(d) {
          return yScale(d) ;
          })
          .attr("height", function(d) {
          return height - yScale(d) + margin.bottom ;  //Just the data value
          })
          .attr("fill", "rgb(51, 153, 102)")
          .attr("class", "rects")

}
