window.onload = function() {

//
  d3.json("https://raw.githubusercontent.com/quintenbecker/Programmeerproject/master/data/json/jsonfile.json").then(function(data) {
    makeWorldmap(data);
    })

}
