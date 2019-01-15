function makeWorldmap(data){



// country = "Albania"
//
// makelinechart(country, data)
// }

window.onload = function() {
  var worldmap = "worldmap.json"
  var request = [d3.json(worldmap)];

  Promise.all(request).then(function(response){

    var height = 500;
    var width = 500;

    var path = d3.geoPath();

    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append('g')
                .attr('class', 'map');

    var projection = d3.geoMercator()
                       .scale(130)
                      .translate( [width / 2, height / 1.5]);

    var path = d3.geoPath().projection(projection);

svg.append("g")
     .attr("class", "countries")
   .selectAll("path")
     .data(response[0].features)
   .enter().append("path")
     .attr("d", path)
     .style('stroke', 'white')
     .style('stroke-width', 1.5)
     .style("opacity",0.8)
     // tooltips
       .style("stroke","white")
       .style('stroke-width', 0.3)
       .on('mouseover',function(d){
         tip.show(d);

         d3.select(this)
           .style("opacity", 1)
           .style("stroke","white")
           .style("stroke-width",3);
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
