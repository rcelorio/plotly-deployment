

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
  title: "<b>Top 10 Bacteria Species</b> <br> Samples per OTU ID</b>",
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
  // define the layout
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
} // end buildBubble

// build the gauge
// Muchos thankyous to: https://com2m.de/blog/technology/gauge-charts-with-plotly/
function buildGauge(sample) {

  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    //get the samples frequency value
    let sampleWfreq = result.wfreq;
    
    
    //define x and y position for tip
    var degrees = (9 - sampleWfreq) * 20,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    //create the pointer triangle
    var mainPath = 'M .0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    // define some data
    var datagauge = [
      { type: 'scatter',
        x: [0,], y:[0],
      marker: {size: 28, color:'850000'},
      showlegend: false,
      name: 'scrubs',
      text: result.wfreq,
      hoverinfo: 'text+name'},
      
      { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9,50/9,50/9,50/9, 50],
      rotation: 90,
      text: ['8-9', '7-8', '6-7','5-6', '4-5', '3-4', '2-3',
              '1-2', '0-1', ''],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['rgba(30,120,30, .5)', 'rgba(55,135,55, .5)','rgba(80,150,80, .5)',
              'rgba(105,165,105, .5)', 'rgba(130,180,130, .5)','rgba(155,195,155, .5)',
                'rgba(180,210,180, .5)','rgba(205,225,205, .5)', 'rgba(230,240,230, .5)',
                            'rgba(255, 255, 255, 0)']},
      hoverinfo: 'none',
      hole: .5,
      type: 'pie',
      showlegend: false}
      ];

      // define the layout
      var layout = {
        shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: { color: '850000' }
        }],
        title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
        height: 600,
        width: 600,
        
        // move zero to the center
        xaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]}
      };

    Plotly.newPlot('gauge', datagauge, layout);  
 
  });
}//end buildGauge




// select control
function optionChanged(newSample) {
  buildMetadata(newSample);


  d3.json("samples.json").then((data) => {
    
    
    //let sampleNames = data.names.filter(sampleObj => sampleObj.id == newSample);
    //let sampleSample = data.samples.map(sampleObj1 => {parseFloat(sampleObj1.id )== newSample});
    
    let sampleSample = data.samples.forEach((sampleObj1) => {
      if (parseFloat(sampleObj1.id) == newSample) {
        buildBarChart(sampleObj1);
        buildBubble(sampleObj1);
        buildGauge(newSample);
      }});
    
  });

}


  init();
 
  
