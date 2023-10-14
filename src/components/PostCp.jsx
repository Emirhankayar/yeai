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
        <div className="container mx-auto space-y-20 mx-auto px-10">
            <Typography variant="h2" color="blue" textGradient={true} className="text-start">
                Top 50 AI tools of All Time
            </Typography>

            {data.map((post, index) => (
                <div key={index}>
                    <a href={post.url} target="_blank" rel="noopener noreferrer nofollow">
                        <Typography
                            variant="h3"
                            color="lime"
                            textGradient={true}
                            className="cursor-pointer pb-5"
                        >
                            {post.title}
                        </Typography>
                    </a>
                    <div className="space-y-5">
                        {post.content.map((content, contentIndex) => (
                            <Typography
                                variant="paragraph"
                                color="inherit"
                                className="text-justify"
                                key={contentIndex}
                            >
                                {content}
                            </Typography>
                        ))}
                    </div>
                </div>
            ))}
            {isFetching && 
                !isEndOfScroll && !reachedEnd &&
                Array.from({ length: loadingSkeletons }).map((_, index) => (
                    <SkeletonPost key={index} />
                ))}
        </div>
    );
}
