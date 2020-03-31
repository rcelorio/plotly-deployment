









function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
        });

    })
}

  // build panel metadata
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      //iterate through the result
      Object.entries(result).forEach(([key,val]) => {
        PANEL.append("h6").text(key + ": " + val);
      });     
    });
  }



// select control
function optionChanged(newSample) {
  buildMetadata(newSample);
  //buildCharts(newSample);
}


  init();
 
  
  buildMetadata(d3.select("#selDataset").node().value);