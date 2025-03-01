import { pointsFromDate } from "./billboardAPI.js";
import { writeFile } from 'fs/promises';

export function dateToYYYYMMDD(date){

    const year = date.getFullYear();
    let month = date.getMonth()+1;
    let dayDate = date.getDate();
    if(month<10){ month = '0'+month;}
    if(dayDate<10) {dayDate = '0'+dayDate;}

    return year + '-' + month + '-' + dayDate;
}


export function getRecentSaturday(givenDate) {

    const daysSince = (givenDate.getDay() + 1) % 7
    const MS_DAY = 86400000;

    return new Date(givenDate - daysSince*MS_DAY);
}

//TODO - make it work from start to end and not end to start
export function getDates(start, end){
    let startDate = getRecentSaturday(start)
    const MS_DAY = 86400000;
    const dates = [];

    while(startDate > end){
        dates.push( dateToYYYYMMDD( new Date( startDate ) ) )
        startDate -= 7*MS_DAY
    }

    return dates.reverse();
}

export function combineLists(lists){
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

export function intersecLists( filter, lists ){
    let temp = {};

    for (let l of lists){
        for (let key in l){
            if( filter.includes(key) ){
                temp[key] = l[key];
            }
        }
    }

    return temp
}

export async function pullBoards(dates) {
    const multipleBoards = [];

    for (let d in dates){
        const board = await pointsFromDate(dates[d]);
        multipleBoards.push(board);
        console.log("Finished pulling board " + d + " of " + dates.length);
    }

    return multipleBoards;
}

export async function writeToFile(content, name) {
    try {
        await writeFile( './data/'+name+'.json', content);
        console.log('File written successfully!');
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

export async function pointMatrix( filter, lists ){
    const matrix = [];
    for (let l in lists){
        const row = [];
        for (let item in filter){
            
            if(filter[item] in lists[l]){
                row.push(lists[l][filter[item]]);
            }
            else {
                row.push(0);
            }

        }
        matrix.push(row);
    }
        
    return matrix;
}