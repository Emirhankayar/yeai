// Imports and other code remain the same
import React, { useState, useEffect } from 'react';
import { retrieveCategoriesFromSupabase } from '../utils/utils';
import { useNavigate, Link } from 'react-router-dom';
import { SkeletonCategory } from '../common/Skeleton';
import { icons } from '../common/content';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let cachedCategories = localStorage.getItem('categories');
        if (cachedCategories) {
          setCategories(JSON.parse(cachedCategories));
        } else {
          const categories = await retrieveCategoriesFromSupabase();
          setCategories(categories);
          localStorage.setItem('categories', JSON.stringify(categories));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    
    fetchCategories();
    // Add cleanup logic function
    const cleanup = () => {
      // Perform cleanup operations here if necessary
    };
  
    return cleanup;
  }, []);
  
  const filteredCategories = search
    ? categories.filter((category) =>
        category.toLowerCase().includes(search.toLowerCase())
      )
    : categories;

  const handleCategoryClick = async (category) => {
    navigate(`/categories/${category}`);
    window.scrollTo(0, 0); 
  };

  if (isLoading || !categories || categories.length === 0) {
    return (
      <div className="container mx-auto px-10">
        <div className='mb-10'>
        <Input
          variant='static'
          label="Search Posts"
          color="white"
        />
        </div>
        <div className='flex flex-row items-center justify-between mb-10'>

          <Typography variant='lead' textGradient color='blue' className='font-bold capitalize'>Category List</Typography>
          <Link to="/">
            <Button
              className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize">
              Go Back To Home Page
            </Button>
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: categories ? categories.length : 4 }).map(
            (_, index) => <SkeletonCategory key={index} />
          )}
        </ul>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10">
      <div className='mb-10'>
      <Input
          value={search}
          variant='static'
          onChange={(e) => setSearch(e.target.value)}
          label="Search category"
          color="white"
          icon={<icons.MagnifyingGlassIcon className="h-4 w-4" stroke="white" />}
        />

      </div>
      <div className='flex flex-row items-center justify-between mb-10'>

        <Typography variant='lead' textGradient color='blue' className='font-bold capitalize'>Category List</Typography>
        <Link to="/">
          <Button
            className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize">
            Go Back To Home Page
          </Button>
        </Link>
      </div>
      <ul className='flex flex-col gap-10 grid md:grid-cols-2 lg:grid-cols-3'>
        {filteredCategories.map((category, index) => (
          <Card className="w-full bg-gray-900" key={index}>
            <CardBody>
              <div className="mb-2">
                <Typography variant='lead' color="white" className="font-bold capitalize text-center">
                  {category}
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="pt-0 text-center">
              <Button
                onClick={() => handleCategoryClick(category)}
                className="bg-blue-900/10 text-blue-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 capitalize"
              >
                View Posts
              </Button>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
