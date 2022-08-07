import { collectUserDecks } from '../functions/collectUserDecks.js';
import { collectTopUsers } from '../functions/collectTopUsers.js'

//Goal: Grab top users for NA, grab all their decks, save to database.
//7-23-22 Created for organizing functions into job for collecting data as needed.

try {
    //grab most recent top users
    await collectTopUsers("am");

    //save their deck info to db
    collectUserDecks("AM", 15) //set to higher numbers when doing daily pulls

} catch (error) {
    console.log("Job Error: " + error)
}