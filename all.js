window.onload = function() {

//
  d3.json("scripts/jsonfile.json", function(error, data) {
      console.log(data);
      makeWorldmap(data);

    })

}
