// CategoryCp.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import InfiniteScroll from 'react-infinite-scroll-component';

const CategoryList = () => {
  const pageSize = 6;
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories', {
        params: {
          page: page,
          pageSize: pageSize,
        },
      });

      const retrievedCategories = response.data;

      if (retrievedCategories.length > 0) {
        if (page === 1) {
          setCategories(retrievedCategories);
        } else {
          setCategories((prevCategories) => [...prevCategories, ...retrievedCategories]);
        }
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  fetchCategories();
}, [page]);

const fetchMoreCategories = async () => {
  try {
    const nextPage = page + 1;
    console.log('Fetching more categories for page:', nextPage);
    const response = await axios.get('http://localhost:5000/categories', {
      params: {
        page: nextPage,
        pageSize: pageSize,
      },
    });

    const moreCategories = response.data;

    if (moreCategories.length === 0) {
      console.log('No more categories to fetch');
      setHasMore(false);
    } else {
      setCategories((prevCategories) => {
        const allCategories = [...new Set([...prevCategories, ...moreCategories])]; // Use Set to remove duplicates
        return allCategories;
      });
      setPage(nextPage);
    }
  } catch (error) {
    console.error('Error fetching more categories:', error);
  }
};
  
  const filteredCategories = search
  ? [...Array.from({ length: page * pageSize })] // Fill with empty items to match the expected length
      .map((_, index) => categories[index]) // Use the fetched categories if available
      .filter(category => category && category.toLowerCase().includes(search.toLowerCase()))
  : categories;

  const handleCategoryClick = async (category) => {
    navigate(`/categories/${category}`);
    window.scrollTo(0, 0); 
  };

  const renderLoadingCategories = Array.from({ length: pageSize }).map((_, index) => (
    <SkeletonCategory key={index} />
  ));

  if (isLoading || !categories || categories.length === 0) {
    return (
      <div className="container px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-40">
          {renderLoadingCategories}          
      </div>
    );
  }

  const renderCategories = filteredCategories.slice(0, page * pageSize).map((category, index) => (
  <Card variant='gradient' color='gray' className="w-full border-2 border-gray-800 text-gray-500" key={index}>
      <CardBody>
        <div className="mb-2">
          <Typography variant='lead' color="white"  className="font-bold capitalize text-center">
            {category}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0 text-center">
        <Button
          onClick={() => handleCategoryClick(category)}
          >
          View Posts
        </Button>
      </CardFooter>
    </Card>
  ));

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
        <Typography variant='h3' color='white' className='font-bold capitalize'>Category List</Typography>
        <Link to="/">
          <Button>
            Go Back To Home Page
          </Button>
        </Link>
      </div>
      <InfiniteScroll
        dataLength={categories.length}
        next={fetchMoreCategories}
        hasMore={hasMore}
        scrollThreshold={0.6} 
        loader={<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>{renderLoadingCategories}</div>} 
      >
      <ul className='flex flex-col gap-10 grid md:grid-cols-2 lg:grid-cols-3'>
          {renderCategories}
      </ul>
      </InfiniteScroll>
    </div>
  );
};

export default CategoryList;