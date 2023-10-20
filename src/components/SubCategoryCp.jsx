// SubCategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPostsByCategory, truncateDescription } from '../utils/utils';
import { SkeletonPost } from '../common/Skeleton';
import { icons } from '../common/content';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Tooltip,
} from "@material-tailwind/react";
const SubCategoryPage = () => {
  const { categoryName } = useParams();
  const [categoryPosts, setCategoryPosts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let cachedCategoryPosts = localStorage.getItem(`category_${categoryName}_posts`);
        if (cachedCategoryPosts) {
          setCategoryPosts(JSON.parse(cachedCategoryPosts));
        } else {
          const posts = await fetchPostsByCategory(categoryName);
          setCategoryPosts(posts);
          localStorage.setItem(`category_${categoryName}_posts`, JSON.stringify(posts));
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    // Add cleanup logic function if necessary
    const cleanup = () => {
      // Perform cleanup operations here if needed
    };
  
    fetchPosts();
  
    return cleanup;
  }, [categoryName]);

  const filteredPosts = search
  ? categoryPosts.filter((post) =>
      post.post_title.toLowerCase().includes(search.toLowerCase())
    )
  : categoryPosts;

  const handlePostClick = (postId) => {
    navigate(`/categories/${categoryName}/${postId}`);
    window.scrollTo(0, 0); 
  };

  if (isLoading || !categoryPosts || categoryPosts.length === 0) {
    return (
      <div className="container mx-auto px-10 space-y-10">
        <div className='mb-10'>
          <Input
          variant='static'
          label="Search Posts"
          color="white"
        />
      </div>
        <div className='flex flex-row  items-center justify-between'>
          <Typography variant='lead' color='blue' textGradient className='capitalize font-bold '>Posts in {categoryName}</Typography>
          <Link to="/categories">
            <Button 
              className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize"
            >
              Go Back To Categories
            </Button>
          </Link>
        </div>
        <ul className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2'>
          {Array.from({ length: categoryPosts ? categoryPosts.length : 4 }).map((_, index) => (
            <SkeletonPost key={index} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className='space-y-10 px-10 container'>
      <div className='mb-10'>
      <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Search Posts"
          variant='static'
          color="white"
          icon={<icons.MagnifyingGlassIcon className="h-4 w-4" stroke="white" />}
        />
      </div>
      <div className='flex flex-row  items-center justify-between'>
      <Typography variant='lead' color='blue' textGradient className='capitalize font-bold '>Posts in {categoryName}</Typography>
      <Link to="/categories">
      <Button 
        className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize">
              Go Back To Categories
      </Button>
      </Link>
      </div>
      <ul className="gap-10 lg:grid-cols-2 md:grid-cols-2 grid grid-cols-1">
      {filteredPosts.map((post, index) => (

          <Card className="w-full bg-gray-900" key={index}>
            <CardBody>
              <div className="mb-2 flex flex-col items-start space-y-4">
                <div className='flex flex-row items-center justify-between w-full'>
                  <Typography variant='lead' color="blue" textGradient className="font-bold capitalize">
                    {post.post_title}
                  </Typography>
                  
                  <Tooltip content={post.post_category} className='bg-orange-400' >
                    <icons.TagIcon className='h-5 w-5' stroke='orange' />
                  </Tooltip>

                </div>
                <Typography variant='paragraph' color="inherit">
                  {truncateDescription(post.post_description, 120)}
                </Typography>
              </div>

            </CardBody>

            <CardFooter className="pt-0 flex items-start gap-4">
              <Button
                onClick={() => handlePostClick(post.id)}
                className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize"
              >
                Read More
              </Button>
              <Link to={post.post_link}
                target="_blank" rel="noopener noreferrer">
                <Button
                  className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize"
                >
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

export default SubCategoryPage;
