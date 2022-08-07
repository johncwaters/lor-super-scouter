import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';


export async function ldb_read_item(name, tag, region) {
    try {
        var rawdata = fs.readFileSync('../../json/database/matchHistory/' + name + tag + region + '.json');
        var data = JSON.parse(rawdata); //turn json into javascript object
    } catch (err) {
        console.error(err);
    }
};