
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kmvgwujdkgkdoilvsbmw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function supa_write_items(params) {
    try {
        //insert many rows
        const { data, error } = await supabase
            .from('match_history')
            .insert(params
                //[{ some_column: 'someValue', other_column: 'otherValue' }
                //,{ another_row_column: 'someValue', other_column: 'otherValue' }],
            )
            .throwOnError(true)

        console.log('Sucessfully saved to match_history.');

    } catch (error) {
        console.log(error);
    }
}



