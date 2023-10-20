// PostDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPostById, fetchPopularPosts, truncateDescription } from '../utils/utils';
import { SkeletonPost } from '../common/Skeleton'
import { icons } from '../common/content'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
const PostDetailsPage = () => {
  const { categoryName, postId } = useParams();
  const [post, setPost] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 


  useEffect(() => {
    const fetchPostData = async () => {
      try {
        let cachedPost = localStorage.getItem(`post_${postId}`);
        if (cachedPost) {
          setPost(JSON.parse(cachedPost));
        } else {
          const fetchedPost = await fetchPostById(postId);
          setPost(fetchedPost);
          localStorage.setItem(`post_${postId}`, JSON.stringify(fetchedPost));
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const fetchPopularData = async () => {
      try {
        let cachedPopularPosts = localStorage.getItem(`popular_posts_${categoryName}`);
        if (cachedPopularPosts) {
          const popularPosts = JSON.parse(cachedPopularPosts);
          const filteredPopularPosts = popularPosts.filter((popularPost) => popularPost.id !== postId);
          setPopularPosts(filteredPopularPosts);
        } else {
          const popularPosts = await fetchPopularPosts(categoryName, 4);
          const filteredPopularPosts = popularPosts.filter((popularPost) => popularPost.id !== postId);
          setPopularPosts(filteredPopularPosts);
          localStorage.setItem(`popular_posts_${categoryName}`, JSON.stringify(popularPosts));
        }
      } catch (error) {
        console.error('Error fetching popular posts:', error);
      }
    };
  
    const cleanup = () => {
      // Add cleanup logic here if necessary
    };
  
    fetchPostData();
    fetchPopularData();
  
    return cleanup;
  }, [categoryName, postId]);
  
  

  const handlePopularPostClick = (postId) => {
    navigate(`/categories/freebies/${postId}`);
    window.scrollTo(0, 0); 
  };
  if (isLoading || !post) {
    return (
      <div className="container mx-auto px-10 space-y-20">
        <div>
                <div className='flex flex-row  items-center justify-between mb-10'>
          <icons.EyeIcon className='w-5 h-5 ml-4'/>
          <Link to={`/categories/${categoryName}`}>
            <Button 
              className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize"
            >
              Go Back To {categoryName}
            </Button>
          </Link>
        </div>
          <SkeletonPost />
        </div>

        <Typography variant='lead' color="pink" textGradient className="font-bold capitalize">
          Popular Posts in {categoryName}
        </Typography>

        <ul className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2'>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonPost key={index} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 space-y-20">
      <div>
      <div className='flex flex-row  items-center justify-between mb-10'>
          <Typography variant='lead' color='blue' textGradient className='capitalize font-bold flex flex-row items-center'>
            <Tooltip content={post.post_title} >
              <icons.EyeIcon className='w-5 h-5 ml-4' stroke='white'/>
              </Tooltip>
              </Typography>
          <Link to={`/categories/${categoryName}`}>
              <Button className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize">
                Go back to {categoryName}
              </Button>
            </Link>
        </div>

        <Card className="w-full bg-gray-900">
          <CardBody>
            <div className="mb-2 flex flex-col items-start space-y-4">
              <Typography variant='lead' color="blue" textGradient className="font-bold capitalize">
                {post.post_title}
              </Typography>
              <Typography variant='paragraph'>
                {post.post_description}
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="pt-0 flex items-start gap-4">
            <Link to={post.post_link} target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize">
                Visit Website
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Typography variant='lead' color="orange" textGradient className="font-bold capitalize">
        Popular Posts in {categoryName}
      </Typography>

      <ul className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2'>
        {popularPosts.map((popularPost, index) => (
          <Card className="w-full bg-gray-900" key={index}>
            <CardBody>
            <div className="mb-2 flex flex-col items-start space-y-4">
                <div className='flex flex-row items-center justify-between w-full'>
                  <Typography variant='lead' color="blue" textGradient className="font-bold capitalize">
                    {popularPost.post_title}
                  </Typography>
                  
                  <Tooltip content={popularPost.post_category} className='bg-orange-400' >
                    <icons.TagIcon className='h-5 w-5' stroke='orange' />
                  </Tooltip>

                </div>
                <Typography variant='paragraph'>
                  {truncateDescription(popularPost.post_description, 120)}
                </Typography>
              </div>
            </CardBody>

            <CardFooter className="pt-0 flex items-start gap-4">
              <Button
                onClick={() => handlePopularPostClick(popularPost.id)}
                className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize"
              >
                Read More
              </Button>
              <Link to={popularPost.post_link} target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize">
                  Visit Website
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default PostDetailsPage;