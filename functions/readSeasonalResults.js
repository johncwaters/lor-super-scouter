import { readFile } from 'fs/promises';

//Formats results and reduces json size for use in browser
//IMP: Results are only as complete as lormasters.com data, so if a match wasn't recorded, it wont show in the results AKA their tracker wasn't turned on
export async function readSeasonalResults(region, date) {

    var currentResults = JSON.parse(
        await readFile(
            new URL('../json/collectSeasonalResults/currentResults' + region.toUpperCase() + '.json', import.meta.url)
        )
    );

    //grab date
    var searchDate = new Date(date).setHours(0, 0, 0, 0);
    //empty array to save results to
    let playerRecords = [];

    try {
        //loops through each players total history
        //TODO only read today's games, otherwise each days results will overlap
        for (var y = 0; y < currentResults.length; y++) {
            let recordMatchWins = 0;
            let recordMatchlosses = 0;
            let countWins = 0;
            let countlosses = 0;

            //if the searchDate is less than or equal to the matchDate <=

            //filter out the no datas
            if (currentResults[y][0] === undefined) {
                //do nothing if no data was pulled for that user
                console.log("No user data. Too bad LoR's API is a joke.")
            } else {
                //TODO: Figure out a much better way of determining W/L. This also assumes the full match has been played out but may not affect results anyway.
                //IMP: go through players records BACKWARDS with this sad method
                for (var i = currentResults[y].length - 1; i >= 0; i--) {

                    let matchDateLocal = new Date((currentResults[y][i].start_time).toLocaleString())
                    let matchDate = new Date(matchDateLocal).setHours(0, 0, 0, 0);

                    if (matchDate === searchDate) {
                        //if 2 wins: 1 match win
                        //if 2 losses: 1 match loss
                        //if 2 wins 1 loss: 1 match win
                        //if 1 win 2 losses: 1 match loss
                        if (currentResults[y][i].outcome === 'win') {
                            countWins++
                        } else if (currentResults[y][i].outcome === 'loss') {
                            countlosses++
                        }

                        //once wins/losses becomes 2, count it towards match wins/losses
                        if (countWins === 2) {
                            recordMatchWins++
                            countWins = 0;
                            countlosses = 0;
                        } else if (countlosses === 2) {
                            recordMatchlosses++
                            countWins = 0;
                            countlosses = 0;
                        }
                    } else {
                        //do nothing, wrong date
                    }
                }

                let tempdata = {
                    player: currentResults[y][0].player,
                    matchWins: recordMatchWins,
                    matchlosses: recordMatchlosses,
                }
                //temp sort for semi finals
                if (tempdata.matchWins >= 3) {
                    console.log(tempdata)
                }

                //TODO This is what will be used to display online, no need to save.
                playerRecords.push(tempdata)

            }

        }

        //console.log(playerRecords);

    } catch (err) {
        console.error(err);
        console.log("Potentially no data found for user.")
    }

}