// list all charts
const { listCharts } = require('billboard-top-100');

listCharts((err, charts) => {
  if (err) console.log(err);
  // array of all charts
  console.log(charts);
});node