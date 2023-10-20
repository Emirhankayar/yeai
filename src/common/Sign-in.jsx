import React from "react";
import { Popover, PopoverHandler, PopoverContent, Button } from "@material-tailwind/react";
import { Auth } from '@supabase/auth-ui-react'
import {
  ThemeSupa,
} from '@supabase/auth-ui-shared'
import { supabase } from '../utils/utils'

export default function SignInForm() {

  return (
    <Popover placement="bottom-end" offset={20} className='z-1000'>
      <PopoverHandler>
        <Button variant="outlined" fullWidth color="blue-gray" size="sm">Sign In</Button>
      </PopoverHandler>
      <PopoverContent className="w-96">
      <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={['google']}
      theme="dark"
    />
      </PopoverContent>
    </Popover>
  );
}
