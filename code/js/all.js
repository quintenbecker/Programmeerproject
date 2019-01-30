window.onload = function() {

//
  d3.json("data/json/jsonfile.json").then(function(data) {
    makeWorldmap(data);
    })

}
