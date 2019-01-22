function makeWorldmap(data){



// country = "Sweden"
//
// makelinechart(data)


  var worldmap = "map.json"
  var request = [d3.json(worldmap)];
  var format = d3.format(",");

  d3.json("map.json").then(function(d){

  })
  Promise.all(request).then(function(response){
    var height = 400;
    var width = 1000;

    // Set tooltips
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                  return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>";
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
         .style("fill", 'steelblue')
         .style('stroke', 'white')
         .style('stroke-width', 1.5)
         .style("opacity",0.8)
         .on("click", function(f){
           makelinechart(f.properties.name, data)
         })
         // tooltips
         .style("stroke","white")
         .style('stroke-width', 0.3)
         .on('mouseover',function(d){
             d3.select(this)
               .style("opacity", 1)
               .style("stroke","white")
               .style("stroke-width",3)
               tip.show(d);
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
