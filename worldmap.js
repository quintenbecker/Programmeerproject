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
    d3.select("#d3-dropdown").append("option").attr("value", "Belgium").html("Belgium")
    d3.select("#d3-dropdown").selectAll(".option").data(Object.keys(data[year]))
    .enter().append("option")
    .attr("value", function(d){ console.log(d);return d})
    .html(function(d){ return d})



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
                      .translate( [width / 2 - 50, height+ 280]);

    var path = d3.geoPath().projection(projection);

    // svg.selectAll()

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
           return "steelblue"}
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
           console.log(d);
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
}
