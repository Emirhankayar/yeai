import { useState, useEffect } from 'react';
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

const SV_URL = import.meta.env.VITE_SV_URL;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(1); 
  const [page, setPage] = useState(1);

  
  const fetchCategories = async (page) => {
    try {
      const response = await axios.get(`${SV_URL}/categories`, {
        params: {
          page: page,
        },
      });
  
      const retrievedCategories = response.data;
  
      if (retrievedCategories.length > 0) {
        if (page === 1) {
          setCategories(retrievedCategories); 
        } else {
          setCategories((prevCategories) => [
            ...prevCategories,
            ...retrievedCategories,
          ]);
        }
      } else {
        setHasMore(false);        
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const fetchMoreCategories = () => {
    const nextPage = page + 1;
    setNextPage(nextPage)
    fetchCategories(nextPage);
    setPage(nextPage);
  };
  
  useEffect(() => {
    fetchCategories(1); // fetch the first page of data
  }, []);
  

  const handleCategoryClick = async (category) => {
    navigate(`/categories/${category}`);
    window.scrollTo(0, 0); 
  };

  const renderLoadingCategories = Array.from({ length: nextPage }).map((_, index) => (
    <SkeletonCategory key={index} />
  ));

  if (isLoading || !categories || categories.length === 0) {
    return (
      <div className="container px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-40">
          {renderLoadingCategories}          
      </div>
    );
  }

  const renderCategories = categories.map((category, index) => (
  <Card variant='gradient' color='gray' className="w-full border-2 border-gray-800 text-gray-500" key={index}>
      <CardBody>
        <div className="mb-2">
          <Typography variant='lead' color="white"  className="font-medium  font-oxanium uppercase text-center">
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