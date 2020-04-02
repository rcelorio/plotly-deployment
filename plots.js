

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

  //grab the top 10
  let sampleValues = data.sample_values.slice(0,10);
  let otuIds = data.otu_ids.slice(0,10);
  let otuLabels = data.otu_labels.slice(0,10);
  
  // reverse it
  sampleValues.reverse();
  otuIds.reverse();
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

// build the buble chart

function buildBubble(data) {
  //get the data
  let sampleValues = data.sample_values;
  let otuIds = data.otu_ids;
  let otuLabels = data.otu_labels;


  let trace1 = {
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      size: sampleValues.map(size => size * .65),
      color: otuIds,
      colorscale: 'Earth'
    }

  };
  
  let data1 = [trace1];
  
  let layout = {
    title: "<b>Relative Frequency of Bacterial Species</b> <br> Samples per OTU ID</b>",
    xaxis: {
      title: 'OTU ID',
    },
    yaxis: {
      title: 'Sample Value'
    },
    width: 1100,
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    aper_bgcolor: 'rgba(0, 0, 0, 0)',
    showlegend: false,
  };
  
  Plotly.newPlot('bubble', data1, layout, {responsive: true});
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
        buildBubble(sampleObj1);
      }});
    
    //buildBarChart(sampleSample);
  });


  //buildBarChart(newSample);
  //buildCharts(newSample);
}


  init();
 
  
