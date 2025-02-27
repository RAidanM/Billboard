import {getDates, pullBoards, intersecLists, writeToFile, pointMatrix} from './billboardManipulation.js';

async function dataOutput(start, end, artists) {

    const dates = getDates( start, end );

    const completeData = {}
    for( let date of dates){

        const board = await pullBoards( [date] );

        const instersectedLists = intersecLists(artists, board);
        
        const data = [];
        
        for (let key in instersectedLists){
            const obj = {};
            obj['artist'] = key;
            obj['points'] = instersectedLists[key];
            data.push(obj);
        }

        completeData[date] = data;
        
    }

    writeToFile(JSON.stringify(completeData), 'artistGrowthData' );
}

async function multiLineArtists(start, end, chosen_artists) {
    const data = {};
    //labels
    const dates = getDates( start, end );
    data['labels'] = dates;
    //datasets
    
    const board = await pullBoards( dates );
    const matrix = await pointMatrix(chosen_artists, board);

    const dataset = [];
    for (let artist in chosen_artists){
        const obj = {};

        //label
        obj['label'] = chosen_artists[artist];

        //data
        const row = [];
        for(let i = 0; i < matrix.length; i++){
            row.push(matrix[i][artist]);
        }
        obj['data'] = row;
        dataset.push(obj);
    }

    data['datasets'] = dataset;

    return data;
}

async function matrixTest(a, b, chosen_artists) {
    const dates = getDates( a, b );

    const board = await pullBoards( dates );

    const matrix = pointMatrix(chosen_artists, board);
        
    console.log(matrix);

}

const a = new Date( Date.now() );
const b = new Date( 2025, 0, 1 );
const chosen_artists = [
    'The Weeknd', 'Ed Sheeran', 'BTS', 'Harry Styles', 'Travis Scott', 
    'Bruno Mars', 'Rauw Alejandro', 'Hozier', 'Beyonce', 'Mariah Carey', 
    'Bad Bunny', 'Morgan Wallen', 'Taylor Swift', 'Tito Double P', 'Post Malone', 
    'Kendrick Lamar', 'Lana Del Rey', 'Gracie Abrams', 'Coldplay', 'Benson Boone', 
    'Lady Gaga', 'Ariana Grande', 'ROSE', 'Olivia Rodrigo', 'Lil Nas X', 
    'Sabrina Carpenter', 'Billie Eilish', 'Giveon', 'Teddy Swims', 'Arctic Monkeys', 
    'Doechii', 'Tate McRae', 'BLACKPINK', 'GloRilla', 'Doja Cat', 'SZA', 
    'Chappell Roan', 'Miley Cyrus', 'Tyler The Creator', 'Tyla', 'Stray Kids', 
    'beabadoobee', 'Summer Walker', 'PARTYNEXTDOOR', 'Demi Lovato'
];

const output = await multiLineArtists( a, b, chosen_artists);
writeToFile(JSON.stringify(output),'multiLineArtists Output');