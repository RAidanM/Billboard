import {getDates, pullBoards, intersecLists, writeToFile, pointMatrix, intersecListsNoFilter} from './billboardManipulation.js';

async function biggestTotal(start, end) {

    const dates = getDates( start, end );
    const boards = await pullBoards( dates );
    const allPoints = await intersecListsNoFilter(boards);


    const sortedEntries = Object.entries(allPoints).sort(([, valueA], [, valueB]) => valueA - valueB);
    writeToFile(JSON.stringify(sortedEntries.reverse()), 'totalMergedData' );
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

async function participantPortfolio(start, end, participants) {
    const data = {};


    const labels = [];
    const datasets = [];

    const dates = getDates( start, end );
    const boards = await pullBoards( dates );
    const allPoints = await intersecLists( seperateArtists(participants), boards);

    for(let p in participants){
        labels.push(participants[p].participant);
        
        for(let a of participants[p].artists){
            const obj = {};
            obj['label'] = a;

            let temp = [];
            for (let i = 0; i < p; i++){
                temp.push(0);
            }
            const points = (a in allPoints) ? allPoints[a] : 0;
            
            temp.push(points);
            console.log(temp);

            obj['data'] = temp;
            obj['stack'] = 'Stack 0';
            datasets.push(obj);
        }

    }

    data['labels'] = labels;
    data['datasets'] = datasets;

    return data;
}

function seperateArtists(participants) {
    const arr = [];

    for(let p of participants){
        arr.push(p.artists);
    }

    return arr.flat();
}

const a = new Date( Date.now() );
const b = new Date( 2025, 0, 1 );

const participants = [
    {
        participant: 'Jack',
        artists: ['The Weeknd', 'Ed Sheeran', 'BTS', 'Harry Styles', 'Travis Scott','TWICE']
    },
    {
        participant: 'Davide',
        artists: ['Bruno Mars', 'Rauw Alejandro', 'Hozier', 'Beyonce', 'Mariah Carey','sombr']
    },
    {
        participant: 'Aidan',
        artists: ['Bad Bunny', 'Morgan Wallen', 'Taylor Swift', 'Tito Double P', 'Post Malone','Beele']
    },
    {
        participant: 'Mathilda',
        artists: ['Kendrick Lamar', 'Lana Del Rey', 'Gracie Abrams', 'Coldplay', 'Benson Boone']
    },
    {
        participant: 'Daniel',
        artists: ['Lady Gaga', 'Ariana Grande', 'ROSE', 'Olivia Rodrigo', 'Lil Nas X',"EJAE"]
    },
    {
        participant: 'Becca',
        artists: ['Sabrina Carpenter', 'Billie Eilish', 'Giveon', 'Teddy Swims', 'Arctic Monkeys','KATSEYE']
    },
    {
        participant: 'Manny',
        artists: ['Doechii', 'Tate McRae', 'BLACKPINK', 'GloRilla', 'Doja Cat','Drake']
    },
    {
        participant: 'Jess',
        artists: ['SZA', 'Chappell Roan', 'Miley Cyrus', 'Tyler The Creator', 'Tyla',"Andrew Choi"]
    },
    {
        participant: 'Megan',
        artists: ['Stray Kids', 'beabadoobee', 'Summer Walker', 'PARTYNEXTDOOR', 'Demi Lovato','Alex Warren']
    }
    // ,
    // {
    //     participant: 'Unclaimed',
    //     artists: ['Fuerza Regida','Beele','Karol G',"Jennie",'REI AMI','Audrey Nuna','Justin Bieber']
    // }
];

const portfolioOutput = await participantPortfolio(a,b,participants);
console.log(portfolioOutput);
writeToFile( JSON.stringify(portfolioOutput), 'portfolioOutput' );
const multiLineOutput = await multiLineArtists( a, b, seperateArtists(participants) );
writeToFile( JSON.stringify(multiLineOutput), 'multiLineOutput' );

const total = await biggestTotal(a, b);
