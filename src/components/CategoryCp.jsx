import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SkeletonCategory, PgTitle, PgButton, InfScroll } from '../common/Skeleton';
import { icons } from '../common/content';
import { CategoryCard } from '../common/Card';
import { Input } from '@material-tailwind/react';

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
    if (nextPage === 0) {
      setHasMore(false);
    }
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
        <PgTitle text='Category List'/>
        <Link to="/">
        <PgButton text='Home'></PgButton>
        </Link>
      </div>
      <InfScroll
        dataLength={categories.length}
        next={fetchMoreCategories}
        hasMore={hasMore}
        scrollThreshold={0.6} 
        loader={<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>{renderLoadingCategories}</div>} 
      >
      <ul className='flex flex-col gap-10 grid md:grid-cols-2 lg:grid-cols-3'>
      {categories.map((category, index) => (
        <CategoryCard
                  key={index}
                  category={category}
                  handleCategoryClick={handleCategoryClick}
        />

      ))}
      </ul>
      </InfScroll>
    </div>
  );
};

export default CategoryList;