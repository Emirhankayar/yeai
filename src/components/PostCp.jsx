import React, { useState, useEffect } from 'react';
import { Typography } from '@material-tailwind/react';
import { fetchData } from '../utils/utils';
import { SkeletonPost } from '../common/Skeleton';

export default function PostCp() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isEndOfScroll, setIsEndOfScroll] = useState(false);
    const [reachedEnd] = useState(false);
    const [loadingSkeletons, setLoadingSkeletons] = useState(5);

    const handleScroll = () => {
        const scrollThreshold = 800;

        if (!reachedEnd && !isEndOfScroll) {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - scrollThreshold
            ) {
                if (!isFetching && hasMore) {
                    setIsFetching(true);
                    setPage((prevPage) => prevPage + 1);
                } 
            }
        }
    };    

    useEffect(() => {
        if (!isEndOfScroll) {
            fetchData(page, (newData) => {
                if (page === 1) {
                    setData(newData);
                } else if (newData.length === 0) {
                    setHasMore(false);
                    setIsEndOfScroll(true);
                } else {
                    setData((prevData) => [...prevData, ...newData]);
                    setIsFetching(false);
                    setLoadingSkeletons(5);
                }
            }, setError, setIsFetching);
        }
    }, [page, isEndOfScroll]);


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isFetching, hasMore, isEndOfScroll, reachedEnd]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
<div className="container mx-auto">
  <div className="space-y-40 max-w-3xl mx-auto px-10">
    {data.map((post, index) => (
      <div key={index}>

        <div className="space-y-5">
          <div className=''>

          <Typography variant="h3" color="lime" textGradient={true} className="cursor-pointer">
            <a href={post.url} target="_blank" rel="noopener noreferrer nofollow">
              {post.title}
            </a>
          </Typography>
          <div className='space-y-5'>
            <Typography variant="paragraph" color="inherit" className="text-left">
              {post.content}
            </Typography>
          </div>
          </div>


        <div className='pt-5'>
          <Typography variant="h4" color="lime" textGradient={true} className="pb-5">
            {post.best_features_title}
          </Typography>
          <div className="space-y-5">
            {post.best_features_content.map((content, contentIndex) => (
              <Typography variant="paragraph" color="inherit" className="text-left" key={contentIndex}>
               <li>{content}</li> 
              </Typography>
            ))}
          </div>
        </div>

        <div className='pt-5'>
          <Typography variant="h4" color="lime" textGradient={true} className="pb-5">
            {post.limitations_title}
          </Typography>
          <div className="space-y-5">
            {post.limitations_content.map((content, contentIndex) => (
              <Typography variant="paragraph" color="inherit" className="text-left" key={contentIndex}>
               <li>{content}</li> 
              </Typography>
            ))}
          </div>
        </div>
        <div className='pt-5'>
          <Typography variant="h4" color="lime" textGradient={true} className="pb-5">
            {post.pricing_title}
          </Typography>
          <div className="space-y-5">
          {post.pricing_content.map((content, contentIndex) => (
            <Typography variant="paragraph" color="inherit" className="text-left" key={contentIndex}>
              <li>{content}</li> 
            </Typography>
          ))}
          </div>
        </div>
        </div>
      </div>
    ))}
    {isFetching && !isEndOfScroll && !reachedEnd && Array.from({ length: loadingSkeletons }).map((_, index) => <SkeletonPost key={index} />)}
  </div>
</div>

    );
}
