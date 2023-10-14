import React, { useRef, useEffect } from 'react';
import { Typography } from '@material-tailwind/react';

export default function HeroCp() {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // Change this threshold value based on your requirements
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, options);

        if (video) {
            observer.observe(video);
        }

        return () => {
            if (video) {
                observer.unobserve(video);
            }
        };
    }, []);

    return (
        <div className="relative h-screen w-screen">
          <div className="w-full absolute top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50">
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
                className="flex flex-row gap-1 font-oxanium font-extrabold lg:text-5xl "
              >                       
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                </svg>
                yeAI
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
          <video
  ref={videoRef}
  className="h-full w-full object-cover brightness-50 z-0"
  autoPlay
  muted
  loop
>

  <source
    media="(max-width: 1280px)"
    src="src/assets/herovid_medium.mp4"
    type="video/mp4"
  />
 
  Your browser does not support the video tag.
</video>

        </div>
      );
      
      
    }    