(async function() {

  //const fullData = await ( await fetch('./data/artistGrowthData.json')).json();

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'line',
      data: {
        labels: ['2025-01-04','2025-01-11','2025-01-18'],
        datasets: [
          {
            label: 'Mariah Carey',
            //data: data.map(row => row.points)
            data: [174,50]
          },
          {
            label: 'Rose',
            data: [394,600]
            //data: data.map(row => row.points)
          },
          {
            label: 'Bruno Mars',
            data: [835,0]
            //data: data.map(row => row.points)
          }
        ]
      }
    }
  );
})();