// PostFetcher.js
import React, { useEffect, useState } from 'react';
import PostsGrid from './PostsGrid';

const PostFetcher = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://your-render-app-url.com/posts') // Replace with your Render app URL
            .then((response) => response.json())
            .then((data) => {
                setPosts(data.posts);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return <PostsGrid posts={posts} />;
};

export default PostFetcher;
