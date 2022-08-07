import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';


export async function ldb_write_item(name, tag, region, data) {
    try {
        var parsedData = JSON.stringify(data); //turn data into json string
        fs.writeFileSync('../../json/database/matchHistory/' + name + tag + region + '.json', parsedData);
    } catch (err) {
        console.error(err);
    }
};

//example
data = {
    owner: {
        owner_comb: "Otzo NA1 Americas", //partition key

        //player info
        owner_name: "Otzo",
        owner_tag: "NA1",
        owner_puuid: "aoijhsdiohpjh...",
        owner_region: "Americas",
    },
    game: {
        //game info
        game_start_time_utc: "2022-07-30:39:41.7704820+00:00",
        game_mode: "Constructed", //bo3?
        game_type: "Ranked", //seasonal?
    },
    deck_one: {
        //deck 1
        code: "aoisdjghoair...",
        egion_one: "faction_Demacia_Name",
        region_two: "faction_Shurima_Name",
        wins: 1,
        loses: 1,
        win_percent: "50%"
    },
    deck_two: {
        //deck 2
        code: "aoisdjghoair...",
        egion_one: "faction_Demacia_Name",
        region_two: "faction_Shurima_Name",
        wins: 1,
        loses: 1,
        win_percent: "50%"
    },
    deck_three: {
        //deck 3
        code: "aoisdjghoair...",
        egion_one: "faction_Demacia_Name",
        region_two: "faction_Shurima_Name",
        wins: 1,
        loses: 1,
        win_percent: "50%"
    },
    match: {
        //overall stats
        match_wins: 1,
        match_loses: 1,
        match_percent: "50%"
    }
};