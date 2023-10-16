// PostDetails.js
import React, { useEffect, useState } from 'react';
import { retrieveSinglePostFromSupabase } from '../utils/utils';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";

export default function PostDetails() {
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        const data = await retrieveSinglePostFromSupabase(postId);
        setPost(data);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchSinglePost();
  }, []);

  if (!post || Object.keys(post).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto grid grid-cols-1 gap-10 place-items-center">
      <Card className="w-80">
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-bold">
              {post.post_title}
            </Typography>
          </div>
          <div className='flex flex-row justify-between gap-4 mb-3'>
            <Tooltip content={post.postTag}>
              <Button color='blue' size='sm' className='text-sm capitalize'>
                {post.post_category}
              </Button>
            </Tooltip>
            <Tooltip content={post.post_price}>
              <Button
                color={post.post_price === 'Free' ? 'green' : post.post_price === 'Freemium' ? 'orange' : 'red'}
                size='sm'
                className='text-sm capitalize'
              >
                {post.post_price}
              </Button>
            </Tooltip>
          </div>
          <Typography variant="small" color="gray" className="font-normal opacity-75">
            {post.post_description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="w-4" /> 
          <Link to={post.post_link} target="_blank" rel="noopener noreferrer" className="flex-grow">
            <Button
              fullWidth={false}
              size='md'
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize w-full"
            >
              Visit
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};


