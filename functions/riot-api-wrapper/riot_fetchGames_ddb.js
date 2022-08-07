import Lor from "lor-api-wrapper";
import { uploadDbBulk } from "../dynamoDBfuncs/ddb_batchwriteitem.js";

//create instance with our Riot API Token
var lor = new Lor(process.env.RIOT_API_KEY);

//get user by name, grab games, return valid game data to save
export async function riot_fetchGames(name, tag, region) {
    try {
        //grab user by name and save their puuid
        var puuid = await lor.getUserByName(name, tag, region)
            .then((data) => {
                var json = JSON.parse(data.body)
                return json.puuid
            }) //catch errors
            .catch((err) => console.log(err));

        //stop future calls if the user is not found
        if (puuid == undefined) {
            throw new Error('User Not Found')
        }

        //use puuid to get last 20 matches played
        var matches = await lor.getUserMatchHistory(puuid, region)
            .then((data) => {
                var json = JSON.parse(data.body)
                return json
            }) //catch errors
            .catch((err) => console.log(err));

        //blank object to add to and upload outside of loop
        var params = {
            RequestItems: {
                Games: [ //table name
                    //new games go here
                ],
            },
        };

        for (let i = 0; i < matches.length; i++) {
            //get match details for each game
            var game = await lor.getMatchDetails(matches[i], region)
                .then((data) => {
                    var json = JSON.parse(data.body)
                    return json
                })
                .catch((err) => {
                    console.log(err)
                    return err.message
                });

            //Catch error codes and try again if necessary, only tries again once.
            if (game == 'statusCode=404') { /*do nothing*/ }
            else if (game == 'statusCode=429') { //stop trying 429 rate limit exceeded 
                console.log('Error: Rate limit reached. Stopping requests.' + err)
                break
            }
            else if (game == 'statusCode=503') { //try again 503 service unavailable
                var game = await lor.getMatchDetails(matches[i], 'Americas')
                    .then((data) => {
                        var json = JSON.parse(data.body)
                        return json
                    })
                    .catch((err) => {
                        console.log('Error: Service unavailable. Not trying again.' + err)
                        return undefined
                    });
            }
            // If no error code, and game is not undefined, continue with saving the game
            else if (game != undefined) { //add to params
                console.log(game);

                //figure out which player is which in results
                if (game['info']['players'][0].puuid == puuid) {
                    var owner = 0
                    var opp = 1
                } else if (game['info']['players'][1].puuid == puuid) {
                    var owner = 1
                    var opp = 0
                };
                //object to add to params
                var addParams = {
                    PutRequest: {
                        Item: {
                            owner_comb: { S: name + " " + tag + " " + region }, //partition key
                            game_start_time_utc: { S: game['info'].game_start_time_utc }, //sort key

                            owner_name: { S: name },
                            owner_tag: { S: tag },
                            owner_puuid: { S: game['info']['players'][owner].puuid },
                            owner_deck_code: { S: game['info']['players'][owner].deck_code },
                            owner_region_one: { S: game['info']['players'][owner]['factions'][0] },
                            owner_region_two: { S: game['info']['players'][owner]['factions'][1] },

                            opp_puuid: { S: game['info']['players'][opp].puuid },
                            opp_deck_code: { S: game['info']['players'][opp].deck_code },
                            opp_region_one: { S: game['info']['players'][opp]['factions'][0] },
                            opp_region_two: { S: game['info']['players'][opp]['factions'][1] },

                            game_outcome: { S: game['info']['players'][owner].game_outcome },
                            game_mode: { S: game['info'].game_mode },
                            game_type: { S: game['info'].game_type },
                            game_region: { S: region },
                            //match_game: { N: "1" }, //determine this when pulling data instead of when saving
                            match_id: { S: matches[i] },
                        },
                    },
                };

                //add to object each game if it is seasonal
                if (game['info'].game_type == 'Ranked') { //TODO change this to seasonal
                    params.RequestItems.Games.push(addParams);
                    console.log(params);
                } else {
                    //do nothing
                };
            };
        }; //end of loop

        //UPLOAD BATCH ITEMS
        if (params.RequestItems.Games.length != 0) { //only upload if there is something to save
            uploadDbBulk(params);
        } else {
            //do nothing
        }


    } catch (err) {//catch all cause safe
        console.error(err);
    }
};


