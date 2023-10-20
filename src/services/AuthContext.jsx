import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/utils'

const AuthContext = createContext()

export function AuthProvider(props) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        //console.log("Event:", event);
        //console.log("Session:", session);
        setUser(session?.user ?? null);
      }
    );
  
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  

  async function signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        throw error;
      }
  
      // Handle successful sign-in if needed
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  }

  async function signUp(name, email, password) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })
  
    if (error) {
      throw error
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}