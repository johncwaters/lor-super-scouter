import Lor from "lor-api-wrapper";
import { supa_write_items } from "../supabasedb/supa_write_items.js";
import { supa_read_recent } from '../supabasedb/supa_read_recent.js';

//create instance with our Riot API Token
var lor = new Lor(process.env.RIOT_API_KEY);


/**  NOTES */
//Need a better way of validating if the game was part of the tournament or not
//ex tracking the person they play against (opponent) and checking if they are part of the tourny or not
//If they are, it's likely part of the tourny. If not, skip it.

//Error handingly through lor-api-wrapper needs cleaned up. Kinda all over the place due to quick changes
//ex some apis return errors while others throw them?

//How quickly can the apis run if we stop wasting api calls?
//ex currently a few apis are on 'waits' due to rate limitting on riots side.
//Are these necessary or is it because code was wasting api calls even tho it knew we were out of calls?

//How to tell if tournament is over?
//ex if a full run through of the function happens with 0 updates have it stop?

//TODO create function to count up matches, either in SQL or JS and put onto tables
//Will want this to be part of the SQL views but probably wont work
//JS call match count up function right after a player is updated (in index.js)

//TODO Clean-up console.logs in functions. Great for debugging but slows things down and isn't clean
//Set-up a logger of some sort?

//TODO Change date checker from minus 1 day to minus 3 hours/1 hours?
//If the calls start when the tournament starts, there is no need for it to go back so far.


//get user by name, grab games, save valid game data to db
export async function riot_fetchGames(name, tag, region) {

    try {
        //grab user by name and save their puuid
        var puuid = await lor.getUserByName(name, tag, region)
            .then((data) => {
                var json = JSON.parse(data.body)
                console.log(name + " - Found player PUUID") //DEBUG
                return json.puuid
            }) //catch errors
            .catch((err) => {
                console.log("PLAYER NOT FOUND: " + name + " " + tag + " " + region)
                throw new Error(err) //swallow error faster to avoid wasting calls
            });


        //stop future calls if the user is not found
        //TODO This is never hit since error is being swallowed earlier?
        if (puuid == undefined) {
            throw new Error('User Not Found ' + name + ' ' + tag)
        }

        //grab the most recent game played by owner_comb and only save games played after that time
        var compare_date_string = await supa_read_recent(name + tag + region)
            .then((data) => { //will return undefined if no user is found / previously has been saved
                if (data == undefined) {
                    const startOfDay = new Date();
                    startOfDay.setUTCHours(0, 0, 0, 0);
                    startOfDay.setDate(startOfDay.getDate() - 1) //set to 1 day in the past
                    return startOfDay;
                } else {
                    return data;
                }
            })
            .catch((err) => {
                console.log(err)
                return err.message
            });

        //make the loop wait
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

        //use puuid to get last 20 matches played
        var matches = await lor.getUserMatchHistory(puuid, region)
            .then((data) => {
                var json = JSON.parse(data.body)
                console.log(name + " - Matches found") //DEBUG
                return json
            }) //catch errors
            .catch((err) => {
                throw new Error(err) //swallow error faster to avoid wasting calls
            });

        //blank array to add to and upload outside of loop
        var params = [];

        for (let i = 0; i < matches.length; i++) {
            await wait(100 * i)//1/10 a second
            //get match details for each game
            var game = await lor.getMatchDetails(matches[i], region)
                .then((data) => {
                    var json = JSON.parse(data.body)
                    return json
                })
                .catch((err) => {
                    console.log(err)
                    return err
                });


            //Catch error codes and try again if necessary, only tries again once.
            if (game.message == 'statusCode=404') { //TODO Get rid of these statusCode catches and move to lor api wrapper?
                console.log("No data found for match. Moving on.")
            }
            else if (game.message == 'statusCode=429') {
                //stop trying 429 rate limit exceeded 
                console.log('Error: Rate limit reached. Stopping requests.')
                break
            }
            else if (game.message == 'statusCode=503') { //TODO move the retry into the lor API wrapper?
                console.log("RESPONSE 503: trying again.")
                //try again 503 service unavailable
                var game = await lor.getMatchDetails(matches[i], 'Americas')
                    .then((data) => {
                        console.log("TRY AGAIN SUCCESS")
                        var json = JSON.parse(data.body)
                        return json
                    })
                    .catch((err) => {
                        console.log('Error: Service unavailable. Not trying again.' + err)
                        return undefined //TODO Why not just break here?
                    });
            }
            // If no error code, and game is not undefined, continue with saving the game
            else if (game != undefined) { //add to params
                //check if the game is after or equal to the date we're comparing to
                var game_date = new Date(game['info'].game_start_time_utc)
                var compare_date = new Date(compare_date_string)

                if (game_date > compare_date) {

                } else {
                    //don't save the game if it is played BEFORE the compare date
                    console.log(name + ' - Old game, no save and stop searching.') //DEBUG
                    break
                }
                //figure out which player is which in results
                if (game['info']['players'][0].puuid == puuid) {
                    var owner = 0
                } else if (game['info']['players'][1].puuid == puuid) {
                    var owner = 1
                };

                //win or lose?
                if (game['info']['players'][owner].game_outcome == 'win') {
                    var result = 1
                } else if (game['info']['players'][owner].game_outcome == 'loss') {
                    var result = 0
                }

                //object to add to params
                var addParams = {
                    //id: 1,
                    //created_at: "timestamp",
                    owner_comb: name + tag + region, // key

                    //player info
                    owner_name: name,
                    owner_tag: tag,
                    owner_puuid: puuid,
                    owner_region: region,

                    //game info
                    game_start_time_utc: game['info'].game_start_time_utc,
                    game_mode: game['info'].game_mode, //Bo3ChallengeLobby
                    game_type: game['info'].game_type, //blank if bo3
                    game_result: result, // 0 or 1
                    //TODO add opponent for further checking (if the opponent is not playing in the tournament, do not save)
                    //game_opponent: '',

                    //deck
                    deck_code: game['info']['players'][owner].deck_code,
                    deck_region_one: game['info']['players'][owner]['factions'][0],
                    deck_region_two: game['info']['players'][owner]['factions'][1],
                };

                //add to object if proper game mode/type
                if (game['info'].game_mode == 'Bo3ChallengeLobby') {
                    //DEBUG game['info'].game_mode == 'Ranked'
                    console.log(name + ' - Saving game.') //DEBUG
                    params.push(addParams);
                } else {
                    break
                };


            };
        }; //end of loop

        //SAVE RESULTS
        if (params.length == 0) {
            console.log("Nothing to save!") //DEBUG
            //nothing to save, don't try to save anything
        } else {
            supa_write_items(params);
            console.log(params); //DEBUG
        }

    } catch (err) {//catch all cause safe
        console.error(err);
    }
};


