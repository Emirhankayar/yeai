import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { handleRedirect, updatePostView } from '../utils/utils';
import { SkeletonPost, InfScroll, PgTitle, PgButton } from '../common/Skeleton';
import { PostCard, SearchBar } from '../common/Card';

const SV_URL = import.meta.env.VITE_SV_URL;

const SubCategoryPage = () => {
  const { categoryName } = useParams();
  const [categoryPosts, setCategoryPosts] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  const [dataLength, setDataLength] = useState(0);

  const handleBookmarkClick = (postId) => {
    setCategoryPosts((prevCategoryPosts) => {
      return prevCategoryPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, isBookmarked: !post.isBookmarked };
        }
        return post;
      });
    });
  };

  useEffect(() => {
    axios
      .get(`${SV_URL}/postsByCategory?categoryName=${categoryName}&offset=0&limit=12`)
      .then((res) => {
        setCategoryPosts(res.data);
        setDataLength(res.data.length);
        if (res.data.length < 12) {
          setHasMore(false);
          setIsLoading(false);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [categoryName]);

  const fetchMoreData = () => {
    axios
    .get(`${SV_URL}/postsByCategory?categoryName=${categoryName}&offset=${index}&limit=12`)
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
  };


  const handlePostClick = async (postId) => {
    const post = categoryPosts.find((post) => post.id === postId);
    if (post) {
      try {
        await updatePostView(postId, post.post_view);
        navigate(`/categories/${categoryName}/${postId}`);
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
    <div className='space-y-10 px-10 container'>
      <div className='flex flex-row  items-center justify-between'>
        <PgTitle text={`Posts in ${categoryName.toUpperCase()}`} />
        <Link to="/categories">
          <PgButton text='Categories' />
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
          handleBookmarkClick={handleBookmarkClick}
          handlePostClick={handlePostClick}
          handleRedirect={handleRedirect}
          />
          ))}
        </ul>
      </InfScroll>
      </div>
      </div>
      </div>
  );
};

export default SubCategoryPage;
