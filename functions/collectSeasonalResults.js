import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';
import { readFile } from 'fs/promises';

import axios from 'axios';

//TODO: Call on timer, 1 minutes?, displayed on site?. Constantly be updating.
//IMP: Will slow things down while running due to calls
//collectSeasonalResults(region) = am/eu/apac
export async function collectSeasonalResults(region) {
    var usersJson = JSON.parse(
        await readFile(
            new URL('../json/regionPlayers/users' + region.toUpperCase() + '.json', import.meta.url)
        )
    );

    //blank array to have final data saved from 
    var saveData = [];

    let regionUC = region.toUpperCase();
    let regionName = ""
    switch (regionUC) {
        case "AM":
            regionName = "americas";
            break;
        case "EU":
            regionName = "europe";
            break;
        case "APAC":
            regionName = "apac";
            break;
    }



    // ====== NEW STUFF STARTS HERE ======
    //create array of all players we need to search for
    var playersToSearch = []
    for (var player = 0; player < usersJson['players'].length; player++) {
        //if player has null tag, do not include, will cause requests to fail
        //most likely the player no longer exsists or error in data
        if (usersJson['players'][player].tag !== null) {
            playersToSearch.push(
                //encodeURI fixes unescaped-characters error cause by different language characters
                encodeURI((regionName + "/" + usersJson['players'][player].name + "/" + usersJson['players'][player].tag)))
        }
    }

    var url = "https://lormaster.herokuapp.com/search/"
    //map each address we need to call, returns list of complete urls
    var myArrayOfData = playersToSearch.map(function (player) {
        return { webAddress: url + player };
    });

    let promises = [];
    //IMP: This only works if website doesn't change how it gets it's information

    myArrayOfData.forEach(function (singleElement) {
        const myUrl = singleElement.webAddress;
        promises.push(axios.get(myUrl));
    });


    //IMP: Currently accidentally DDOS's their website, don't run without a limiter
    Promise.all(promises)
        .then(function (results) {

            results.forEach(function (data) {
                //blank array to have temp data from each user, pushed into tempData
                let formatData = [];

                //grab player name from url
                var urlData = (data['config'].url).split("/");
                var playerName = urlData[5]

                // format data from each player and save to tempData
                for (var i = 0; i < data['data'].length; i++) {
                    if (data['data'][i]['info'].game_mode === "SeasonalTournamentLobby") {
                        if (data['data'][i]['player_info'][0].name === playerName) {
                            let tempdata = {
                                //if player is listed first, record result accordingly
                                start_time: data['data'][i]['info'].game_start_time_utc,
                                player: data['data'][i]['player_info'][0].name,
                                opponent: data['data'][i]['player_info'][1].name,
                                outcome: data['data'][i]['info'].players[0].game_outcome
                            }
                            formatData.push(tempdata)
                        } else {
                            let tempdata = {
                                start_time: data['data'][i]['info'].game_start_time_utc,
                                player: data['data'][i]['player_info'][1].name,
                                opponent: data['data'][i]['player_info'][0].name,
                                outcome: data['data'][i]['info'].players[1].game_outcome
                            }
                            formatData.push(tempdata)
                        }
                    } else {
                        //do nothing if not a seasonal tournament lobby game
                    }
                }

                // Push formatted data to larger object to writefile later
                saveData.push(formatData);
                console.log(formatData);

            });


        }).catch(function (err) {
            console.error(err);
        }).finally(function () {
            //save saveData to file
            // TODO save entire chunk to database with timestamp
            fs.writeFileSync(
                (path.join(__dirname, '../json/collectSeasonalResults/currentResults' + region.toUpperCase() + '.json')),
                JSON.stringify(saveData), //saves data
                'utf8');
            console.log("Saved Data");
        });


}//end of function
