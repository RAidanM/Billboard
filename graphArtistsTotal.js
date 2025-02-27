(async function() {

  const data = [
    { artist: 'Mariah Carey', points: 174 },
    { artist: 'ROSE', points: 394 },
    { artist: 'Bruno Mars', points: 835 },
    { artist: 'Ariana Grande', points: 493 },
    { artist: 'Lady Gaga', points: 198 },
    { artist: 'Ed Sheeran', points: 120 },
    { artist: 'Billie Eilish', points: 471 },
    { artist: 'Gracie Abrams', points: 349 },
    { artist: 'Kendrick Lamar', points: 874 },
    { artist: 'SZA', points: 866 },
    { artist: 'Sabrina Carpenter', points: 670 },
    { artist: 'Benson Boone', points: 223 },
    { artist: 'Teddy Swims', points: 607 },
    { artist: 'The Weeknd', points: 805 },
    { artist: 'Chappell Roan', points: 303 },
    { artist: 'Hozier', points: 240 },
    { artist: 'Coldplay', points: 421 },
    { artist: 'Rauw Alejandro', points: 330 },
    { artist: 'Tito Double P', points: 525 },
    { artist: 'Bad Bunny', points: 3279 },
    { artist: 'Taylor Swift', points: 178 },
    { artist: 'Post Malone', points: 271 },
    { artist: 'Morgan Wallen', points: 464 },
    { artist: 'Tyler The Creator', points: 399 },
    { artist: 'GloRilla', points: 174 },
    { artist: 'Travis Scott', points: 126 },
    { artist: 'Miley Cyrus', points: 111 },
    { artist: 'Arctic Monkeys', points: 163 },
    { artist: 'Tyla', points: 172 },
    { artist: 'Tate McRae', points: 40 },
    { artist: 'Harry Styles', points: 44 },
    { artist: 'Doechii', points: 100 },
    { artist: 'Lana Del Rey', points: 30 },
    { artist: 'Giveon', points: 110 }
  ];

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.artist),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.points)
          }
        ]
      }
    }
  );
})();