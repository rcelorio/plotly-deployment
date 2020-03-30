//Line chart Example
//Plotly.newPlot("plotArea", [{x: [1, 2, 3,4,5,6], y: [10, 20, 30,40,50,60]}]);

/* Bar chart example
var trace = {
    x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
    y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: "bar"
};

var layout = {
    title: "Luncheon Survey",
    xaxis: {title: "Drink Option"},
    yaxis: {title: "Percent of Drinks Ordered"}
};
Plotly.newPlot("plotArea", [trace], layout);
*/

/* Pie Chart
var trace = {
    labels: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita",
       "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
    values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: 'pie'
  };
  var data = [trace];
  var layout = {
    title: "'Bar' Chart",
  };
Plotly.newPlot("plotArea", data, layout);
*/


// Scatter and line
// https://plotly.com/javascript/line-and-scatter/
var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  };
  
  var trace2 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'lines',
    type: 'scatter'
  };
  
  var trace3 = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'lines+markers',
    type: 'scatter'
  };
  
  var data = [trace1, trace2, trace3];
  
  Plotly.newPlot('plotArea', data);

  /* map function example 
  cities = [
    {
      "Rank": 1,
      "City": "San Antonio ",
      "State": "Texas",
      "Increase_from_2016": "24208",
      "population": "1511946"
    },
    {
      "Rank": 2,
      "City": "Phoenix ",
      "State": "Arizona",
      "Increase_from_2016": "24036",
      "population": "1626078"
    },
    {
      "Rank": 3,
      "City": "Dallas",
      "State": "Texas",
      "Increase_from_2016": "18935",
      "population": "1341075"
    }
];

cityNames = cities.map(function(city){
    return city.City;
});
console.log(cityNames);
  */
