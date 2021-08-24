const data = [
  {
    "Cheese": 22.2,
    "CHOCOLATE": 10.3,
    "Impulse": 1.5,
    "period": "2021_26"
  },
  {
    "Cheese": 21.8,
    "CHOCOLATE": 9.8,
    "Impulse": 1.5,
    "period": "2021_27"
  },
  {
    "Cheese": 21.2,
    "CHOCOLATE": 9.7,
    "Impulse": 1.4,
    "period": "2021_28"
  }
];
$('document').ready(function() {
  generateGraph();
});

function dataWithTotals(data) {
  let temp;
  let i;
  let total;
  const dataWithTotal = [];
  for (i = 0; i < data.length; i++) {
    temp = data[i];
    total = 0;
    for (const key in data[i]) {
      if (key !== "period") {
        total += data[i][key];
      }
    }
    temp.total = total / 3;
    dataWithTotal.push(temp);
  }
  return dataWithTotal;
}

function getPeriod(dataWithTotal) {
  const labels = [];
  for (let i = 0; i < dataWithTotal.length; i++) {
    labels.push(dataWithTotal[i]['period']);
  }
  return labels;
}

function setValues(keys, dataWithTotal) {
  const graphValues = [];
  let temp;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== "period") {
      temp = {
        label: keys[i],
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
      };

      for (let n = 0; n < dataWithTotal.length; n++) {
        temp.data.push(dataWithTotal[n][keys[i]])
      }

      graphValues.push(temp);
    }
  }
  return graphValues;
}

function generateGraph() {
  const dataWithTotal = dataWithTotals(data);
  const labels = getPeriod(dataWithTotal);
  const keys = Object.keys(dataWithTotal[0]);
  const graphValues = setValues(keys, dataWithTotal);
  const ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: graphValues
    }
  });
}
