

function init() {
    let selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      let sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
        });
        //load the demographics for the 1st time
        optionChanged(d3.select("#selDataset").node().value);
    })
}

  // build panel metadata
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      let metadata = data.metadata;
      let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
      let PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      //iterate through the result
      Object.entries(result).forEach(([key,val]) => {
        PANEL.append("h6").text(key + ": " + val);
      });     
    });
  }

//build the bar chart
function buildBarChart(data) {

  //console.log(data);
  //sort by value
/*  let test = data.sort(function(a, b) {
    return parseFloat(b.sample_values) - parseFloat(a.sample_values);
  }); */

    let sampleValues = data.sample_values.slice(0,10);
   // sampleValues.forEach(foo => console.log(foo));
  sampleValues.reverse();
    let otuIds = data.otu_ids.slice(0,10);
   // otuIds.forEach(foo => console.log(foo));
   otuIds.reverse();
    let otuLabels = data.otu_labels.slice(0,10);
   // otuLabels.forEach(foo => console.log(foo));
   otuLabels.reverse();


// Trace1 for the Greek Data
let trace1 = {
  x: sampleValues,
  y: otuIds.map((label) => "OTU " + label),
  text: otuLabels,
  name: "Top 10",
  type: "bar",
  orientation: "h"
};

// data
let data1 = [trace1];

// Apply the group bar mode to the layout
let layout = {
  title: "Top 10 OTU Results",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar", data1, layout);




}


// select control
function optionChanged(newSample) {
  buildMetadata(newSample);


  d3.json("samples.json").then((data) => {
    
    
    //let sampleNames = data.names.filter(sampleObj => sampleObj.id == newSample);
    //let sampleSample = data.samples.filter(sampleObj1 => {parseFloat(sampleObj1.id )== newSample});
    
    let sampleSample = data.samples.forEach((sampleObj1) => {
      if (parseFloat(sampleObj1.id) == newSample) {
        buildBarChart(sampleObj1);
      }});
    
    //buildBarChart(sampleSample);
  });


  //buildBarChart(newSample);
  //buildCharts(newSample);
}


  init();
 
  
