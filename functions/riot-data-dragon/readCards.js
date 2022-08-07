
import fs from 'fs';


export function readCards(master) {
    //blank object to save to
    var savedata = [];
    //read our master file to memory
    try {
        var rawdata2 = fs.readFileSync('./Resources/cropped-data/master.json');
        var master = JSON.parse(rawdata2); //turn json into javascript object
    } catch (err) {
        console.error(err);
    }

    //loop through 6 sets of data
    for (let i = 1; i < 7; i++) {
        try {
            var rawdata = fs.readFileSync('./Resources/cropped-data/set' + i + '-en_us.json');
            var data = JSON.parse(rawdata); //turn json into javascript object
        } catch (err) {
            console.error(err);
        }

        //loop through each set of data and find the right cards
        for (let i = 0; i < data.length; i++) {
            //console.log(data[i].cardCode)

            //loop through master and find a match
            for (let m = 0; m < master.length; m++) {
                var masterName = master[m].Name
                //console.log(data[i].cardCode + masterName.substring(0, masterName.length - 4))
                if (data[i].cardCode == masterName.substring(0, masterName.length - 4)) {
                    //console.log(data[i].name)//champ name

                    var pushdata = {
                        "cardCode": data[i].cardCode,
                        "name": data[i].name,
                        "region": data[i]['regionRefs'][0],
                        "regiontwo": data[i]['regionRefs'][1]
                    }


                    savedata.push(pushdata)
                }
            }
        }
    }
    let savedatajson = JSON.stringify(savedata)
    fs.writeFileSync('./Resources/cropped-data/masterData.json', savedatajson);
}


//readCards();