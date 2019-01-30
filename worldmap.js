function makeWorldmap(data){


drawMap(data, "2007")
makeSlider(data)
// country = "Sweden"
//
// makelinechart(data)


function makeSlider(data){
  // Simple
  // Time
var dataTime = d3.range(0, 10).map(function(d) {
  return new Date(2007 + d, 9, 3);
});
var gTime = d3
  .select('#slider')
  .append('svg')
  .attr('width', 500)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(30,30)');

var sliderTime = d3
  .sliderBottom()
  .min(d3.min(dataTime))
  .max(d3.max(dataTime))
  .step(1000 * 60 * 60 * 24 * 365)
  .width(300)
  .tickFormat(d3.timeFormat('%Y'))
  .tickValues(dataTime)
  .default(new Date(1998, 10, 3))
  .on('onchange', val => {
    d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
    var year = (d3.timeFormat('%Y')(sliderTime.value()));
    drawMap(data, d3.timeFormat('%Y')(sliderTime.value()))
  });



gTime.call(sliderTime);





}

function drawMap(data, year){

  var worldmap = "map.json"
  var jsonfile = "jsonfile.json"
  var request = [d3.json(worldmap)];
  var format = d3.format(",");

  Promise.all(request).then(function(response){
    if (d3.select(".map")){
      d3.select(".map").remove()
    }

    console.log(data);
    function test(){
      selectValue = d3.select('#d3-dropdown').property('value')
      console.log(selectValue);
      makelinechart(selectValue, data)
    }
    d3.select(" #d3-dropdown").on("change", test)
    d3.select("#d3-dropdown").append("option").html("Choose country")
    d3.select("#d3-dropdown").selectAll(".option").data(Object.keys(data[year]))
    .enter().append("option")
    .attr("value", function(d){;return d})
    .html(function(d){ return d})

    var color = d3.scaleThreshold()
        .domain([10,20,40,60,80,100])
        .range(["rgb(0, 204, 102)",	"rgb(15, 189, 102)", "rgb(51, 153, 102)" ,"	rgb(66, 138, 102)","rgb(82, 122, 102)", "rgb(97, 107, 102)"]);

    var height = 400;
    var width = 1000;

    // Set tooltips
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                  return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" +
                        "<strong>Percentage renewable energy: </strong><span class='details'>" + data[year][d.properties.name]["Share of renewable energy in gross final energy consumption"] + "</span>";
                })

    var path = d3.geoPath();

    var svg = d3.select("#map")
                .append('g')
                .attr('class', 'map');

    svg.call(tip);


    var projection = d3.geoMercator()
                       .scale(440)
                      .translate( [width / 2 - 50, height+ 275]);

    var path = d3.geoPath().projection(projection);

    // svg.selectAll()
    // make legend in #map svgMap

    svg.append("g")
         .attr("class", "countries")
         .selectAll("path")
         .data(response[0].features)
         .enter().append("path")
         .attr("d", path)
         .style("fill", function(d){
           if (data[year][d.properties.name] == undefined){
             return "black"}
           else{
           return color(data[year][d.properties.name]["Share of renewable energy in gross final energy consumption"])}
         })
         .style('stroke', 'white')
         .style('stroke-width', 1.5)
         .style("opacity",0.8)
         .on("click", function(f){
           makelinechart(f.properties.name, data)
         })
         .style("stroke","white")
         .style('stroke-width', 0.3)
         .on('mouseover',function(d){
           // console.log(d);
           if (data[year][d.properties.name] !== undefined){
             d3.select(this)
               .style("opacity", 1)
               .style("stroke","white")
               .style("stroke-width",3)
               tip.show(d);
               }
         })
         .on('mouseout', function(d){
           tip.hide(d);
           d3.select(this)
             .style("opacity", 0.8)
             .style("stroke","white")
             .style("stroke-width",0.3);
              })
       });

   }

// function createLegend() {
//        legend = svg.selectAll(".legend")
//               .data(color)
//               .enter()
//               .append("g")
//               .attr("class" , "legend")
//               .attr("transform", function(d, i) {
//                 return "translate(0," + i * 20 + ")";
//               })
//
//          legend.append('rect')
//            .attr("x", 430)
//            .attr("y", 220)
//            .attr("width", 10)
//            .attr("height", 10)
//            .attr("fill", function(d, i){
//              return "blue"
//            });
//
//          legend.append("text")
//            .attr("x", 450)
//            .attr("y", 500)
//            .text(function(d){
//              return d;
//            })
//      }
//
//      createLegend()
}
