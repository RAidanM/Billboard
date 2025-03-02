(async function() {
    try {
      const response = await fetch('./data/portfolioOutput.json');
      const fullData = await response.json(); // Wait for JSON data

      new Chart(
        document.getElementById('portfolio'),
        {
          type: 'bar',
          data: fullData // Use the fetched data
        }
      );
    } catch (error) {
      console.error('Problem fetching data', error);
    }
  })();