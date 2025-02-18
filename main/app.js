const { getChart } = require('billboard-top-100');
function getRecentTuesday() {
    const now = new Date(Date.now())
    const daysSince = (now.getDay() + 5) % 7
    const MS_DAY = 86400000;

    const recentTues = new Date(now - daysSince*MS_DAY);

    const year = recentTues.getFullYear();
    let month = recentTues.getMonth()+1;
    let dayDate = recentTues.getDate();
    if(month<10){ month = '0'+month;}
    if(dayDate<10) {dayDate = '0'+dayDate;}

    return year + '-' + month + '-' + dayDate;
}

function removeConnector(initialList, connector){
    let temp = [];
    for (let l of initialList){
        if (l.indexOf(connector)!=-1){
            temp.push(l.split(connector));
        }
        else{
            temp.push(l);
        }
    }
    return temp.flat();
}


function fetchSongs() {
    return new Promise((resolve, reject) => {
        getChart('billboard-global-200', getRecentTuesday(), (err, chart) => {
            if (err) {
                reject(err);
            } else {
                resolve(chart.songs);
            }
        });
    });
}

// Using async/await
async function collectArtists() {
    try {
        const songs = await fetchSongs();
        const points = {};
        for(let i = 0; i < 200; i++){
            let pointValue = 200-i;
            let fullArtists = songs[i].artist;
            
            //exceptions (tyler why you gotta be named this way????)
            if (fullArtists.indexOf("Tyler, The Creator")!=-1){
                let temp = fullArtists.split("Tyler,").join("Tyler");
                fullArtists = temp;
            }

            let artists = [];
            artists.push(fullArtists);

            let connectors = [' & ',', ',' X ',' vs. ',' With ',' Featuring '];

            for (let c of connectors){
                artists = removeConnector(artists,c);
            }

            //assign points to all artists for the song
            for (let a of artists){
                formatedArtist = a.trim();

                if (typeof points[formatedArtist] == 'undefined'){
                    points[formatedArtist] = pointValue;
                }
                else {
                    points[formatedArtist] += pointValue;
                }
            }

            
        }

        //output
        const sortedEntries = Object.entries(points).sort(([, valueA], [, valueB]) => valueA - valueB);
        console.log(sortedEntries.reverse());
        //console.log(songs);
    } catch (err) {
        console.log(err);
    }
}

collectArtists();




