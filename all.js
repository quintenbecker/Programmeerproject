window.onload = function() {

//
  d3.json("scripts/jsonfile.json").then(function(data) {
    console.log(data);
    makeWorldmap(data);
    })

}
