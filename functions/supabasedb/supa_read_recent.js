
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kmvgwujdkgkdoilvsbmw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function supa_read_recent(owner_comb) {
    try {
        //grab most recently played game by player and return the time
        let { data: match_history, error } = await supabase
            .from('match_history') //table
            .select("*")
            .limit(1)
            .eq('owner_comb', owner_comb)
            .order('game_start_time_utc', { ascending: false })

        //if no result is returned
        if (match_history.length == 0) {
            return undefined
        } else if (match_history.length == 1) {
            return match_history[0].game_start_time_utc
        }
    } catch (error) {
        console.log(error);
    }
}



