function makeWorldmap(data){



country = "Albania"

makelinechart(country, data)

  // var worldmap = "https://raw.githubusercontent.com/quintenbecker/Programmeerproject/master/worldmap.json"
  // var request = [d3.json(worldmap)];
  // var format = d3.format(",");
  //
  // console.log(request);
  // Promise.resolve(request).then(function(response){
  //   console.log(response);
  //   var height = 500;
  //   var width = 500;
  //
  //   // Set tooltips
  //   var tip = d3.tip()
  //               .attr('class', 'd3-tip')
  //               .offset([-10, 0])
  //               .html(function(d) {
  //                 return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Population: </strong><span class='details'> </span>";
  //               })
  //
  //   var path = d3.geoPath();
  //
  //   var svg = d3.select("#line")
  //               .append("svg")
  //               .append('g')
  //               .attr('class', 'map');
  //
  //   var projection = d3.geoMercator()
  //                      .scale(130)
  //                     .translate( [width / 2, height / 1.5]);
  //
  //   var path = d3.geoPath().projection(projection);
  //
  //   svg.selectAll()
  //
  //   svg.append("g")
  //        .attr("class", "countries")
  //        .selectAll("path")
  //        .data(response.features)
  //        .enter().append("path")
  //        .attr("d", path)
  //        .style("fill", 'black')
  //        .style('stroke', 'white')
  //        .style('stroke-width', 1.5)
  //        .style("opacity",0.8)
  //        // tooltips
  //          .style("stroke","white")
  //          .style('stroke-width', 0.3)
  //          .on('mouseover',function(d){
  //            tip.show(d);
  //
  //            d3.select(this)
  //              .style("opacity", 1)
  //              .style("stroke","white")
  //              .style("stroke-width",3);
  //          })
  //          .on('mouseout', function(d){
  //            tip.hide(d);
  //
  //            d3.select(this)
  //              .style("opacity", 0.8)
  //              .style("stroke","white")
  //              .style("stroke-width",0.3);
  //                })
  //      });

   }
