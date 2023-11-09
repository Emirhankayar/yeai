// utils.js
import { useEffect, useState } from 'react';
const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_DB_KEY;
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(supabaseUrl, supabaseKey);

export const SV_URL = import.meta.env.VITE_SV_URL;

const useSupabaseAuth = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session ? session.user : null);
      }
    );
    
    // Cleanup the listener
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return user;
};







export {
  supabase,
  useSupabaseAuth
};
