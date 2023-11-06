import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PgTitle, SkeletonPost, InfScroll } from '../common/Skeleton';
import { CategoryCard, SearchBar, PostCard } from '../common/Card';
import MaterialComponent from '../common/Material';
import { handleRedirect, updatePostView } from '../utils/utils';
import { UserContext } from '../services/UserContext';
import { BookmarkContext } from '../services/BookmarkContext';
import useFetchCategories from '../hooks/useCategories';
const SV_URL = import.meta.env.VITE_SV_URL;
import { useLocation } from 'react-router-dom';

const CategoryList = () => {
  const categories = useFetchCategories();
  const navigate = useNavigate();
  const location = useLocation();
  const [popularPosts, setPopularPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  const [dataLength, setDataLength] = useState(0);
  const user = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { bookmarks, setBookmarks, handleBookmarkClick } = useContext(BookmarkContext);

  useEffect(() => {
    const fetchPopularData = async () => {
      try {
        const response = await axios.get(`${SV_URL}/trendingPosts`);
        const allPopulars = response.data;
        const displayedPopulars = allPopulars.slice(0, Math.min(allPopulars.length, 50));
        setPopularPosts(displayedPopulars);
      } catch (error) {
        console.error('Error fetching popular posts:', error);
      }
    };
  
    fetchPopularData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      // Update the selectedCategory state
      setSelectedCategory(category);
  
      setIsLoading(true);
      axios
        .get(`${SV_URL}/postsByCategory?categoryName=${category}&offset=0&limit=12`)
        .then((res) => {
          setCategoryPosts(res.data);
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
    }
  }, [location.search]);

  const fetchMoreData = () => {
    if (selectedCategory) {
      axios
        .get(`${SV_URL}/postsByCategory?categoryName=${selectedCategory}&offset=${index}&limit=12`)
        .then((res) => {
          const newPosts = res.data.filter(
            newPost => !categoryPosts.some(existingPost => existingPost.id === newPost.id)
          );
          setCategoryPosts((prevItems) => [...prevItems, ...newPosts]);
          newPosts.length > 0 ? setHasMore(true) : setHasMore(false);
          setDataLength(newPosts.length);
        })
        .catch((err) => console.log(err));
        
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleCategoryClick = (category) => {
    // Update the state
    setSelectedCategory(category);
  
    // Update the URL without causing a page refresh
    navigate(`${location.pathname}?category=${category}`);
  };

  const handlePostClick = async (postId) => {
    const post = popularPosts.find((post) => post.id === postId);
    if (post) {
      try {
        await updatePostView(postId, post.post_view);
        navigate(`/categories/${postId}`);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error updating post view:', error);
      }
    }
  };

  const renderLoadingPosts = Array.from({ length: dataLength }).map((_, index) => (
    <SkeletonPost key={index} />
  ));

  if (isLoading) {
    return (
      <div className="container px-10 grid grid-cols-1 gap-10 mt-40">
        {renderLoadingPosts}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10">
      <div className='flex flex-row items-center justify-between mb-10'>
        <PgTitle text='Category List' />
      </div>
      <div className='flex flex-col md:flex-row lg:flex-row gap-10 max-w-lg mb-20'>
          <MaterialComponent component="Select"  
          label="Select Category"
          labelProps={{ className: "text-white" }}
          menuProps={{ className: "bg-gray-200" }}
          size="md"
          containerProps={{ className: "min-w-[50px]" }}>
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  category={category}
                  handleCategoryClick={handleCategoryClick}
                />
              ))}
            </MaterialComponent>
            <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>         
             </div>
{selectedCategory ? (
  <InfScroll
    dataLength={categoryPosts.length}
    next={fetchMoreData}
    hasMore={hasMore}
    loader={<div className='grid grid-cols-1 gap-10 mt-10'>{renderLoadingPosts}</div>}
  >
    <ul className='gap-10 grid grid-cols-1'>
      {categoryPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          handleBookmarkClick={() => handleBookmarkClick({postId: post.id, bookmarks, setBookmarks, user})}
          handlePostClick={handlePostClick}
          handleRedirect={handleRedirect}
        />
      ))}
    </ul>
  </InfScroll>
) : (
  <ul className='gap-10 grid grid-cols-1 mt-20'>
    {popularPosts.map((post) => (
      <PostCard
        key={post.id}
        post={post}
        handleBookmarkClick={() => handleBookmarkClick({postId: post.id, bookmarks, setBookmarks, user})}
        handlePostClick={handlePostClick}
        handleRedirect={handleRedirect}
      />
    ))}
  </ul>
)}
</div>
  );
};

export default CategoryList;