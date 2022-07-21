import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';

import axios from 'axios';

//collectTopUsers(region) = am/eu/apac
export async function collectTopUsers(region) {
    //AM = americas
    //EU = europe
    //APAC = apac

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

    // URL
    var url = "https://lormaster.herokuapp.com/rank/" + regionName

    //IMP: This only works if website doesn't change how it gets it's information
    try {
        // Fetch JSON
        const { data } = await axios.get(url);

        fs.writeFileSync(
            (path.join(__dirname, '../json/regionPlayers/users' + region.toUpperCase() + '.json')),
            JSON.stringify(data), //saves data
            'utf8');
        console.log("Saved Data");

    } catch (err) {
        console.error(err);
    }

}

