const { getChart } = require('billboard-top-100');
const formatDate = (date) => {
    return date.getFullYear() +'-'+ date.getMonth() +'-'+  date.getDay();
}

getChart('global-200', formatDate(new Date(Date.now())), (err, chart) => {
    if (err) console.log(err);
    console.log(chart.songs);
});
