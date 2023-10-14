// postcp.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Typography } from '@material-tailwind/react';
import { fetchData } from '../utils/utils'

export default function PostCp() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedFetchData = useMemo(() => {
    return () => fetchData(setData, setLoading, setError);
  }, [setData, setLoading, setError]);

  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='container mx-auto space-y-20 mx-auto px-10'>
          <Typography variant='h2' color='blue' textGradient={true} className='text-start'>Top 50 AI tools of All Time</Typography>


            {data.length > 0 ? (
              data.map((post, index) => (
                <div key={index}>

                  <a href={post.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <Typography variant='h3' color='lime' textGradient={true} className='cursor-pointer pb-5'>{post.title}</Typography>
                  </a>

                  <div className='space-y-5'>
                    {post.content.map((content, contentIndex) => (
                      <Typography variant='paragraph' color='inherit' className='text-justify' 
                      key={contentIndex}> {content}
                      </Typography>
                    ))}
                  </div>

                </div>
              ))
            ) : (
              <div>No data to display.</div>
            )}
          </div>


    </>
  );
}
