import express from 'express'; //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';
import { readFile } from 'fs/promises';

import axios from 'axios';

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile(path.join(__dirname, './src/html/home.html'));
    //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.listen(port, () => {
    //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});


import { collectTopUsers } from './functions/collectTopUsers.js'
//collectTopUsers("am");

import { collectSeasonalResults } from './functions/collectSeasonalResults.js'
//7-17-22: 250 players takes 11 minutes
collectSeasonalResults("AM", 250);

import { readSeasonalResults } from './functions/readSeasonalResults.js'
// ✅ Get a String representing the given Date
//    using UTC (= GMT) time zone.
const date = new Date();
//readSeasonalResults("AM", date);

