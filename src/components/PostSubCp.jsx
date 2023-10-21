// PostSubCp.jsx
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
        const fetchedPost = await fetchPostById(postId);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const fetchPopularData = async () => {
      try {
        const popularPosts = await fetchPopularPosts(categoryName, 4);
        const filteredPopularPosts = popularPosts.filter((popularPost) => popularPost.id !== postId);
        setPopularPosts(filteredPopularPosts);
      } catch (error) {
        console.error('Error fetching popular posts:', error);
      }
    };
  
    fetchPostData();
    fetchPopularData();
  }, [categoryName, postId]);
  
  
  

  const handlePopularPostClick = (postId) => {
    navigate(`/categories/${categoryName}/${postId}`);
    window.scrollTo(0, 0); 
  };

  const renderLoadingPosts = Array.from({ length: 4 }).map((_, index) => (
    <SkeletonPost key={index} />
  ));


  if (isLoading || !post) {
    return (
      <div className="container mx-auto px-10 space-y-20">
          {renderLoadingPosts}          
      </div>
    );
  }

  const renderPosts = popularPosts.map((popularPost, index) => (
    <Card variant='gradient' color='gray' className="w-full border-2 border-gray-800 text-gray-500" key={index}>
    <CardBody>
      <div className="mb-2 flex flex-col items-start space-y-4">
          <div className='flex flex-row items-center justify-between w-full'>
            <Typography variant='lead' color="white" className="font-bold capitalize">
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
        >
          Read More
        </Button>
        <Link to={popularPost.post_link} target="_blank" rel="noopener noreferrer">
          <Button>
            Visit Website
          </Button>
        </Link>
      </CardFooter>
    </Card>
    ));

  return (
    <div className="container mx-auto px-10 space-y-20">
      <div>
      <div className='flex flex-row  items-center justify-between mb-10'>
          <Typography variant='lead' color='green' textGradient className='capitalize font-bold flex flex-row items-center'>
            <Tooltip content={post.post_title}>
              <icons.EyeIcon className='w-5 h-5 ml-4' stroke='white'/>
              </Tooltip>
              </Typography>
          <Link to={`/categories/${categoryName}`}>
              <Button>
                Go back to {categoryName}
              </Button>
            </Link>
        </div>

        <Card variant='gradient' color='gray' className="w-full border-2 border-gray-800 text-gray-500">
          <CardBody>
            <div className="mb-2 flex flex-col items-start space-y-4">
              <Typography variant='h4' color='white' className="font-bold capitalize">
                {post.post_title}
              </Typography>
              <Typography variant='paragraph' className='text-justify'>
                {post.post_description}
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="pt-0 flex items-start gap-4">
            <Link to={post.post_link} target="_blank" rel="noopener noreferrer">
              <Button>
                Visit Website
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Typography variant='h3' color="green" textGradient className="font-bold capitalize">
        Popular Posts in {categoryName}
      </Typography>
      <ul className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
        {renderPosts}
      </ul>
    </div>
  );
};

export default PostDetailsPage;