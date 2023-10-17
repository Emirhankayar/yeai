import React, { useEffect, useState } from 'react';
import { retrieveSinglePostFromSupabase, retrieveRelatedPosts, truncateDescription, updatePostView } from '../utils/utils';
import { Link } from 'react-router-dom';
import { icons } from '../common/content';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
  IconButton,
} from "@material-tailwind/react";

export default function PostDetails() {
  const [post, setPost] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);


  // Usage in PostDetails.js
  useEffect(() => {
    const fetchSinglePostAndRelatedPosts = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        const singlePost = await retrieveSinglePostFromSupabase(postId);
        setPost(singlePost);
  
        if (singlePost && singlePost.post_category) {
          const relatedData = await retrieveRelatedPosts(singlePost.post_category, postId);
          if (relatedData) {
            setRelatedPosts(relatedData);
          }
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
  
    fetchSinglePostAndRelatedPosts();
  }, []);
  

  if (!post || Object.keys(post).length === 0) {
    return <div>Loading...</div>;
  }
  const handleReadMore = async (relatedPost) => {
    const { id, post_view, post_title, post_category } = relatedPost;

      const updatedPostView = post_view;
      await updatePostView(id, updatedPostView);

      const constructedURL = `/categories/${encodeURIComponent(post_category)}/${encodeURIComponent(post_title.toLowerCase().replace(/\s+/g, '-'))}?id=${id}`;
      window.location.href = constructedURL;
    }

  

  return (
    <div className="container mx-auto grid grid-cols-1 gap-10 place-items-center">
      <Card className="w-80">
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
          <Tooltip content={post.post_view}>

            <Typography color="blue-gray" className="font-bold">
              {post.post_title}
            </Typography>
            </Tooltip>
            <Tooltip content='Save the post.'>
            <IconButton variant='gradient' color='gray' className='cursor-pointer'>
              {icons.BookmarkIcon && <icons.BookmarkIcon className="h-6 w-6" fill='transparent'/>}
            </IconButton>
            </Tooltip>
          </div>
          <div className='flex flex-row justify-between gap-4 mb-3'>
            <Tooltip content={post.post_category}>
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

      {/* Render related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-8">
          <Typography variant='h2' color='blue' textGradient={true} className="text-xl font-bold mb-4">Related Posts</Typography>
          <div className="grid grid-cols-1 lg:grid-cols-3  gap-4">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="w-80">
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Tooltip content={relatedPost.post_view}>
                    <Typography color="blue-gray" className="font-bold">
                      {relatedPost.post_title}
                    </Typography>
                    </Tooltip>
                    <Tooltip content='Save the post.'>
                    <IconButton variant='gradient' color='gray' className='cursor-pointer'>
                      {icons.BookmarkIcon && <icons.BookmarkIcon className="h-6 w-6" fill='transparent'/>}
                    </IconButton>
                    </Tooltip>
                  </div>
                  <div className='flex flex-row justify-between gap-4 mb-3'>
                    <Tooltip content={relatedPost.post_category}>
                      <Button color='blue' size='sm' className='text-sm capitalize'>
                        {relatedPost.post_category}
                      </Button>
                    </Tooltip>
                    <Tooltip content={relatedPost.post_price}>
                      <Button
                        color={relatedPost.post_price === 'Free' ? 'green' : relatedPost.post_price === 'Freemium' ? 'orange' : 'red'}
                        size='sm'
                        className='text-sm capitalize'
                      >
                        {relatedPost.post_price}
                      </Button>
                    </Tooltip>
                  </div>
                  <Typography variant="small" color="gray" className="font-normal opacity-75">
                    {truncateDescription(relatedPost.post_description, 150)}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex items-center w-full">
                  
                <Link
    onClick={() => handleReadMore(relatedPost)}
    key={relatedPost.id}
    className="flex-grow"
  >
                      <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize w-full">
                        Read More
                      </Button>
                    </Link>

                  <div className="w-4" />
                  <Link to={relatedPost.post_link} target="_blank" rel="noopener noreferrer" className="flex-grow">
                    <Button
                      className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize w-full"
                    >
                      Visit
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}

          </div>
        </div>
      )}
    </div>
  );
};


