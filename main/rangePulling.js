import { pointsFromDate } from "./artists.js";
import { writeFile } from 'fs/promises';

function dateToYYYYMMDD(date){

    const year = date.getFullYear();
    let month = date.getMonth()+1;
    let dayDate = date.getDate();
    if(month<10){ month = '0'+month;}
    if(dayDate<10) {dayDate = '0'+dayDate;}

    return year + '-' + month + '-' + dayDate;
}


function getRecentSaturday(givenDate) {

    const daysSince = (givenDate.getDay() + 1) % 7
    const MS_DAY = 86400000;

    return new Date(givenDate - daysSince*MS_DAY);
}

function getDates(start, end){
    let startDate = getRecentSaturday(start)
    const MS_DAY = 86400000;
    const dates = [];

    while(startDate > end){
        dates.push( dateToYYYYMMDD( new Date( startDate ) ) )
        startDate -= 7*MS_DAY
    }

    return dates.reverse();
}

function combineLists(lists){
    let temp = {};
    for (let l of lists)
        for (let key in l){
            if (key in temp){
                temp[key] += l[key];
            }
            else {
                temp[key] = l[key];
            }
        }
    return temp
}

function intersecLists( filter, lists ){
    let temp = {};
    for (let l of lists)
        for (let key in l){
            if( filter.includes(key) ){
                temp[key] = l[key];
            }
        }
    return temp
}

async function pullBoards(dates) {
    const multipleBoards = [];

    for (let d of dates){
        const board = await pointsFromDate(d);
        multipleBoards.push(board);
    }

    return multipleBoards;
}

async function writeToFile(content,name) {
    try {
        await writeFile(name+'.txt', content);
        console.log('File written successfully!');
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

async function output() {
    //const a = new Date( Date.now() );
    const a = new Date( 2025, 0, 25 );
    const b = new Date( 2025, 0, 1 );
    const chosen_artists = [
        'The Weeknd', 'Ed Sheeran', 'BTS', 'Harry Styles', 'Travis Scott', 
        'Bruno Mars', 'Rauw Alejandro', 'Hozier', 'Beyonce', 'Mariah Carey', 
        'Bad Bunny', 'Morgan Wallen', 'Taylor Swift', 'Tito Double P', 'Post Malone', 
        'Kendrick Lamar', 'Lana Del Rey', 'Gracie Abrams', 'Coldplay', 'Benson Boone', 
        'Lady Gaga', 'Ariana Grande', 'ROSE', 'Olivia Rodrigo', 'Lil Nas X', 
        'Sabrina Carpenter', 'Billie Eilish', 'GIVEON', 'Teddy Swims', 'Arctic Monkeys', 
        'Doechii', 'Tate McRae', 'BLACKPINK', 'GloRilla', 'Doja Cat', 'SZA', 
        'Chappell Roan', 'Miley Cyrus', 'Tyler The Creator', 'Tyla', 'Stray Kids', 
        'beabadoobee', 'Summer Walker', 'PARTYNEXTDOOR', 'Demi Lovato'
    ];
    const dates = getDates( a, b );
    console.log(dates);

    const boards = await pullBoards( dates );
    //console.log(boards);

    const instersectedLists = intersecLists(chosen_artists, boards );
    console.log( instersectedLists );

    //const sortedEntries = Object.entries(combination).sort(([, valueA], [, valueB]) => valueA - valueB);
    //writeToFile(JSON.stringify(sortedEntries.reverse(), null, 2), 'Output' );

}

output();

