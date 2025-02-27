(async function() {
  try {
    const response = await fetch('./data/multiLineArtists Output.json');
    const fullData = await response.json(); // Wait for JSON data

    new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'line',
        data: fullData // Use the fetched data
      }
    );
  } catch (error) {
    console.error('Problem fetching data', error);
  }
})();