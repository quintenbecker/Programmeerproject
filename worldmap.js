function makeWorldmap(data){


drawMap(data)
makeSlider(data)
// country = "Sweden"
//
// makelinechart(data)


function makeSlider(data){
  // Simple
  var data = Object.keys(data);


  var sliderStep = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(500)
    .tickFormat(d3.format(''))
    .ticks(5)
    .step(0.005)
    // .default(0.015)
    .on('onchange', val => {
      d3.select('p#value-step').text(d3.format('')(val));
    });

  var gStep = d3
    .select('#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gStep.call(sliderStep);

  d3.select('p#value-step').text(d3.format('.2%')(sliderStep.value()));

  // d3.select('p#value-simple').text(d3.format('.2%')(sliderSimple.value()));
}

function drawMap(data){
  var worldmap = "map.json"
  var jsonfile = "jsonfile.json"
  var request = [d3.json(worldmap)];
  var format = d3.format(",");

  Promise.all(request).then(function(response){
    var height = 400;
    var width = 1000;

    // Set tooltips
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                  return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" +
                        "<strong>Percentage renewable energy: </strong><span class='details'>" + data["2015"][d.properties.name]["Share of renewable energy in gross final energy consumption"] + "</span>";
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

    svg.selectAll()

    svg.append("g")
         .attr("class", "countries")
         .selectAll("path")
         .data(response[0].features)
         .enter().append("path")
         .attr("d", path)
         .style("fill", function(d){
           if (data["2015"][d.properties.name] == undefined){
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
           if (data["2015"][d.properties.name] !== undefined){
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
