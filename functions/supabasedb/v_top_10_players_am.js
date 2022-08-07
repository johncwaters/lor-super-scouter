
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kmvgwujdkgkdoilvsbmw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function v_top_10_players_am() {
    try {
        //grab most recently played game by player and return the time
        let { data: top_players, error } = await supabase
            .from('v_top_10_players_am') //view
            .select("*")

        //if no result is returned
        if (top_players.length == 0) {
            return undefined
        } else {
            return top_players
        }
    } catch (error) {
        console.log(error);
    }
}



