// Import required AWS SDK clients and commands for Node.js
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../libs/ddbClient.js";

// Set the parameters
export const paramsTest = {
    TableName: "Games",
    Item: {
        owner_comb: { S: "Otzo NA1 Americas" }, //partition key
        owner_region: { S: "Americas" },
        game_start_time_utc: { S: "2022-07-30T05:39:41.7704820+00:00" },
        owner_name: { S: "Otzo" },
        owner_tag: { S: "NA1" },
        owner_puuid: { S: "aoijhsdiohpjh..." },
        owner_deck_code: { S: "aoisdjghoair..." },
        owner_region_one: { S: "faction_Demacia_Name" },
        owner_region_two: { S: "faction_Shurima_Name" },
        opp_comb: { S: "EvilGuy NA1" },
        opp_name: { S: "EvilGuy" },
        opp_tag: { S: "NA1" },
        opp_puuid: { S: "aoijhsdiohpjh..." },
        opp_deck_code: { S: "aoisdjghoair..." },
        opp_region_one: { S: "faction_Demacia_Name" },
        opp_region_two: { S: "faction_Shurima_Name" },
        game_outcome: { S: "win" },
        game_mode: { S: "Constructed" },
        game_type: { S: "Ranked" },
        match_game: { N: "1" },
        match_id: { S: "a1325sd-adsf4..." },
    },
};

//working example
export const run = async () => {
    try {
        const data = await ddbClient.send(new PutItemCommand(paramsTest));
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
};
//run();

//custom function
export async function uploadDb(params) {
    try {
        const data = await ddbClient.send(new PutItemCommand(params));
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
}