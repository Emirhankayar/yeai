import React from 'react';
import { Typography } from '@material-tailwind/react';

export default function HeroCp() {

    return (
        <div className="relative h-screen w-screen">
          <div className="w-full ">
            <div className="w-full space-y-5 flex flex-col items-start h-screen justify-center px-10 sm:px-20 md:px-36 lg:px-52">
              <Typography
                variant="h1"
                color="pink"
                className='font-oxanium font-extrabold'
              >
                Welcome to 
              </Typography>


              <Typography
                variant="h1"
                color="white"
                className="flex flex-row items-center justify-center gap-2 font-oxanium font-extrabold lg:text-5xl "
              >                       
                yeAI
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                </svg>
              </Typography>


              <Typography
                variant="h3"
                color="white"
                className='font-oxanium font-extrabold'
              >
                We Collected & Categorised
              </Typography>


              <Typography
                variant="h3"
                color="white"
                className='font-oxanium font-extrabold'
              >
                All AI tools for YOU
              </Typography>
            </div>
          </div>

        </div>
      );
      
      
    }    