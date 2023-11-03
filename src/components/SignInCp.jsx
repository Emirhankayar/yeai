import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../utils/utils'
import { Typography } from "@material-tailwind/react";

export default function SignInFormPage() {


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
          providers={['google']}
          theme='dark'
        />
      </div>
    </div>
  );
}
