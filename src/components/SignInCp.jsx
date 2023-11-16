import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../utils/utils";
import MaterialComponent from "../common/Material";

export default function SignInFormPage() {

  return (
    <div className="container grid grid-cols-1 place-items-center mx-auto p-10">
      <div>
        <MaterialComponent
          component="Typography"
          variant="h4"
          className="text-emerald-900"
        >
          Sign In / Sign Up
        </MaterialComponent>
        <MaterialComponent
          component="Typography"
          color="gray"
          className="mt-1 font-normal"
        >
          Welcome back again! Enter your credentials to sign-in.
        </MaterialComponent>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "facebook"]}
          theme="dark"
        />
      </div>
    </div>
  );
}