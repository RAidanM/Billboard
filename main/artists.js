import { getChart } from 'billboard-top-100';

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

function fetchSongs(date) {
    return new Promise((resolve, reject) => {
        getChart('billboard-global-200', date, (err, chart) => {
            if (err) {
                reject(err);
            } else {
                resolve(chart.songs);
            }
        });
    });
}

// Using async/await
async function collectArtists(date) {
    try {
        const songs = await fetchSongs(date);
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

            let connectors = [' & ',', ',' X ',' x ',' vs. ',' With ',' Featuring '];

            for (let c of connectors){
                artists = removeConnector(artists,c);
            }

            //assign points to all artists for the song
            for (let a of artists){
                let formatedArtist = a.trim();

                if (typeof points[formatedArtist] == 'undefined'){
                    points[formatedArtist] = pointValue;
                }
                else {
                    points[formatedArtist] += pointValue;
                }
            }
        }

        return points;
        
    } catch (err) {
        console.log(err);
    }
}


export async function pointsFromDate(date) {
    const result = await collectArtists(date);
    return result;
}