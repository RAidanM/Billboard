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


function getRecentTuesday(givenDate) {

    const daysSince = (givenDate.getDay() + 5) % 7
    const MS_DAY = 86400000;

    return new Date(givenDate - daysSince*MS_DAY);
}

function getDates(givenDate, weeks){
    const startDate = getRecentTuesday(givenDate)
    const MS_DAY = 86400000;
    const dates = [];

    for(let i = 0; i < weeks; i++){
        dates.push( dateToYYYYMMDD( new Date(startDate - ( i * (7*MS_DAY) )) ) )
    }
    return dates;
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
    const start_date = new Date(Date.now()-3*365*86400000-51*86400000)
    const boards = await pullBoards( getDates( start_date , 52 ));
    const combination = combineLists(boards);
    const sortedEntries = Object.entries(combination).sort(([, valueA], [, valueB]) => valueA - valueB);
    writeToFile(JSON.stringify(sortedEntries.reverse(), null, 2), dateToYYYYMMDD(start_date) );

}

output();

