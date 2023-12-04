// utils.js
const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_DB_KEY;

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(supabaseUrl, supabaseKey)

export const SV_URL = import.meta.env.VITE_SV_URL;
//export const SV_URL = 'http://localhost:10000';


export { supabase };
