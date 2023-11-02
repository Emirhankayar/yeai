import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SkeletonCategory, PgTitle, PgButton, InfScroll } from '../common/Skeleton';
import { CategoryCard, SearchBar } from '../common/Card';

const SV_URL = import.meta.import.VITE_SV_URL;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    if (searchTerm === '') {
      setCategories([]);
      setIndex(1);
      setHasMore(true);
      setIsLoading(true);
    }
  
    axios
      .get(`${SV_URL}/categories?offset=0&limit=12&search=${searchTerm}`)
      .then((res) => {
        setCategories(res.data);
        setDataLength(res.data.length);
        if (res.data.length < 12) {
          setHasMore(false);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [searchTerm]);

  const fetchMoreData = () => {
    axios
      .get(`${SV_URL}/categories?offset=${index}&limit=12&search=${searchTerm}`)
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

  if (isLoading) {
    return (
      <div className="container px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-40">
        {renderLoadingCategories}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10">
      <div className='flex flex-row items-center justify-between mb-10'>
        <PgTitle text='Category List' />
        <Link to="/">
          <PgButton text='Home'></PgButton>
        </Link>
      </div>
      <div className='flex flex-col md:flex-row lg:flex-row gap-10'>
        <div className='w-full md:w-3/6 lg:w-2/6 px-5'>
        <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        <div className='w-full md:w-4/6 lg:w-4/6'>
        <InfScroll
          dataLength={categories.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>{renderLoadingCategories}</div>}
        >
          <ul className='gap-10 grid grid-cols-1 lg:grid-cols-2'>
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
    </div>
    </div>
  );
};

export default CategoryList;