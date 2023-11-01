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
  const [index, setIndex] = useState(1);
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    axios
      .get(`${SV_URL}/categories?offset=0&limit=12`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
    setDataLength(12);
    setIsLoading(false)
  }, []);


  const fetchMoreData = () => {
    axios
      .get(`${SV_URL}/categories?offset=${index}&limit=12`)
      .then((res) => {
        setCategories((prevItems) => [...prevItems, ...res.data]);
        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
        setDataLength(res.data.length);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };


  const handleCategoryClick = async (category) => {
    navigate(`/categories/${category}`);
    window.scrollTo(0, 0);
  };

  const renderLoadingCategories = Array.from({ length: dataLength }).map((_, index) => (
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
        <PgTitle text='Category List' />
        <Link to="/">
          <PgButton text='Home'></PgButton>
        </Link>
      </div>
      <InfScroll
        dataLength={categories.length}
        next={fetchMoreData}
        hasMore={hasMore}
        scrollThreshold={0.6}
        loader={<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>{renderLoadingCategories}</div>}
      >
        <ul className='flex flex-col gap-10 grid md:grid-cols-2 lg:grid-cols-3'>
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              category={category.post_category}
              handleCategoryClick={handleCategoryClick}
            />

          ))}
        </ul>
      </InfScroll>
    </div>
  );
};

export default CategoryList;