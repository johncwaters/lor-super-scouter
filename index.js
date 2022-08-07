import 'dotenv/config'

import express from 'express';
const app = express();
const port = 5000;

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//cron for scheduling pulls
import Bree from 'bree';

//expose src folder with css, html, etc for browser
app.use(express.static('src'));

//supabase DB stuffs
import { v_top_10_players_am } from './functions/supabasedb/v_top_10_players_am.js';

//routes https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters

// Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/html/home.html'));
});

// Leaderboard
app.get('/leaderboard', (req, res) => {
    res.sendFile(path.join(__dirname, './src/html/leaderboard.html'));

});

// Leaderboard
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, './src/html/about.html'));

});

//Example
app.get('/users', function (req, res) {
    //ex url http://localhost:8080/api/users?id=4&token=sdfa3&geo=us
    const user_id = req.query.id;
    const token = req.query.token;
    const geo = req.query.geo;

    res.send({
        'user_id': user_id,
        'token': token,
        'geo': geo
    });
});


//api for leaderboard loading, always available
app.get('/load/:request', async function (req, res) {
    if (req.params.request == 'topplayers') {
        //grab current top 10 players and their stats
        var topplayers = await v_top_10_players_am()
            .then((data) => { //will return undefined if no data is found
                if (data == undefined) {
                    console.log("No data???");
                } else {
                    return data;
                }
            })
            .catch((err) => {
                console.log(err)
                return err.message
            });

        //send data
        res.send(topplayers);
    }
});

app.listen(port, () => {
    //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});


//SCHEDULE EVERYTHING HERE
const bree = new Bree({
    jobs: [
        {
            name: 'job_tournament_saver',
            interval: '25m' //run the script every X whatever
        }
    ]
})
//bree.start()



import { riot_fetchGames } from './functions/riot-api-wrapper/riot_fetchGames.js';

var players = [
    {
        "name": "4LW HDR",
        "tag": "YEP",
        "region": "Americas"
    },
    {
        "name": "AJAY",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Daddyluvr13",
        "tag": "8234",
        "region": "Americas"
    },
    {
        "name": "WW CameronHanzo",
        "tag": "88888",
        "region": "Americas"
    },
    {
        "name": "codemanjack",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Da Tank Buster",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Doves",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "DREvander51",
        "tag": "6824",
        "region": "Americas"
    },
    {
        "name": "IlPortenio", //?????
        "tag": "2629",
        "region": "Americas"
    },
    {
        "name": "VOID",
        "tag": "OTK",
        "region": "Americas"
    },
    {
        "name": "HDR Finni",
        "tag": "HDR",
        "region": "Americas"
    },
    {
        "name": "Goddraw",
        "tag": "HHJA0",
        "region": "Americas"
    },
    {
        "name": "GR1M",
        "tag": "0007",
        "region": "Americas"
    },
    {
        "name": "GrandpaRoji",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Cephalopod",
        "tag": "718",
        "region": "Americas"
    },
    {
        "name": "HDR iannogueira",
        "tag": "ian",
        "region": "Americas"
    },
    {
        "name": "J01 Fan",
        "tag": "1000",
        "region": "Americas"
    },
    {
        "name": "infinipatrons",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "jastunsation",
        "tag": "9063",
        "region": "Americas"
    },
    {
        "name": "Jdevore74",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "JustSomeBadJuju",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Jwaf",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "kfelt",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Clip2",
        "tag": "OCE",
        "region": "Americas"
    },
    {
        "name": "Lunahri",
        "tag": "8398",
        "region": "Americas"
    },
    {
        "name": "mati24mayo",
        "tag": "mafia",
        "region": "Americas"
    },
    {
        "name": "MattyMon",
        "tag": "9474",
        "region": "Americas"
    },
    {
        "name": "Metal",
        "tag": "9090",
        "region": "Americas"
    },
    {
        "name": "MikeMDC",
        "tag": "NA2",
        "region": "Americas"
    },
    {
        "name": "WW MonteXristo",
        "tag": "MONTE",
        "region": "Americas"
    },
    {
        "name": "NinjaDuelist429",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Ori Or Oro", //?
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Plus eevee", //?
        "tag": "40113",
        "region": "Americas"
    },
    {
        "name": "Pointless Box",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Puyshpii",
        "tag": "DBM",
        "region": "Americas"
    },
    {
        "name": "renrag27",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "SamanthaHoney",
        "tag": "moc",
        "region": "Americas"
    },
    {
        "name": "samsans",
        "tag": "3604",
        "region": "Americas"
    },
    {
        "name": "sCBASSs", //?
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Scissorsbox",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Shadawx",
        "tag": "zaun",
        "region": "Americas"
    },
    {
        "name": "SnipeCrossGG", //?
        "tag": "moc",
        "region": "Americas"
    },
    {
        "name": "squallywag",
        "tag": "0715",
        "region": "Americas"
    },
    {
        "name": "Sudrakon",
        "tag": "BR1",
        "region": "Americas"
    },
    {
        "name": "thez56", //?????
        "tag": "6585",
        "region": "Americas"
    },
    {
        "name": "Elchelero",
        "tag": "SHHHH",
        "region": "Americas"
    },
    {
        "name": "Trinathan",
        "tag": "2515",
        "region": "Americas"
    },
    {
        "name": "Trivo",
        "tag": "BR1",
        "region": "Americas"
    },
    {
        "name": "XxWhatAmIxX",
        "tag": "NA1",
        "region": "Americas"
    },
    {
        "name": "Yrebellion", //?
        "tag": "NA1",
        "region": "Americas"
    }
]
//make the loop wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
/*
let i = 0; //DEBUG start from the middle
for (i in players) {
    //if the calls are too fast then riot freakes out
    await riot_fetchGames(players[i].name, players[i].tag, players[i].region);
    await wait(7000)//1000 = 1 second
}

*/