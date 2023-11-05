import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../utils/utils'
import { Typography } from "@material-tailwind/react";

export default function SignInFormPage() {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session ? session.user : null;
        console.log(user);
      }
    );

    // Cleanup the listener
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  return (
    <div className="container grid grid-cols-1 place-items-center mx-auto p-10">
      <div className="">

        <Typography variant="h4" textGradient className="text-green-300">
          Sign In / Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back again! Enter your credentials to sign-in.
        </Typography>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook']}
          theme='dark'
        />
      </div>
    </div>
  );
}
