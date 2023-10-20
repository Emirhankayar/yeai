import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { supabase } from '../utils/utils';
import { icons } from "../common/content";

export default function Account() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { data: users, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (fetchError) {
      setError(fetchError.message);
    }

    if (users && users.length > 0) {
      setError('A user with this email already exists. Please use a different email.');
    } else {
      const { user, error: signUpError } = await supabase.auth.signUp({
        name: name,
        email: email,
        password: password
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setIsRegistered(true);
      }
    }
  }

  return (
    <Card color="transparent" shadow={false}>
      {isRegistered ? (
        <div className="text-center">
          <icons.CheckCircleIcon color="lightgreen" size="regular" className="w-32 h-32 mb-2" />
          <Typography className="mb-2">
            Registration successful.
          </Typography>
          <Typography className="mb-2">
            Please check your email for confirmation to start using your account.
          </Typography>
          <Typography className="mb-2">
            For assistance, contact our support team.
          </Typography>
          <a href="/">
            <Button size="sm" variant="gradient" className="mt-5">Take me back to the home page</Button>
          </a>
        </div>
      ) : (
        <>
          {error && (
            <Typography color="red" className="mb-2" label="Input Error">
              {error}
            </Typography>
          )}
          <Typography variant="h4" color="blue" textGradient>
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSignUp}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue" textGradient className="-mb-4">
              Your Name
            </Typography>
            <Input
              size="lg"
              id="name"
              type="name"
              color="white"
              variant="static"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}

            />
            <Typography variant="small" color="blue" textGradient className="-mb-4">
              Your Email
            </Typography>
            <Input
              id="email"
              type="email"
              color="white"
              variant="static"
              placeholder="johndoe@mail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="small" color="blue" textGradient className="-mb-4">
              Password
            </Typography>
            <Input
              id="password"
              type="password"
              color="white"
              variant="static"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-blue-600">
              Sign In
            </a>
          </Typography>
        </form>
        </>
            )}
      </Card>
    );
  }
  