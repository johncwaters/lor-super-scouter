

import { riot_fetchGames } from "../functions/riot-api-wrapper/riot_fetchGames.js";

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

let i = 0;
for (i in players) {
    //if the calls are too fast then riot freakes out
    riot_fetchGames(players[i].name, players[i].tag, players[i].region);
    await wait(10000)//1000 = 1 second
}

