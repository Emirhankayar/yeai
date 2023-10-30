import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { supabase } from '../utils/utils'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );
  
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  

  async function signIn(email, password) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
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
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useAuth() {
  return useContext(AuthContext)
}
