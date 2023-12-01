import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/utils";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession;
    setSession(session);
    setUser((user) => (session?.user?.id !== user?.id ? session?.user : user));
    setLoading(false);

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      setUser((user) =>
        session?.user?.id !== user?.id ? session?.user : user
      );
      setSession(session);
    });

    // Clear session when window is closed
    window.addEventListener("beforeunload", supabase.auth.signOut);

    return () => {
      authListener.unsubscribe();

      // Remove the event listener when the component is unmounted
      window.removeEventListener("beforeunload", supabase.auth.signOut);
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };
  
  return (
    <AuthContext.Provider
      value={{ user, session, signOut, isLoading, id: user?.id }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;