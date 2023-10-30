// SubCategoryCp.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { truncateDescription, handleRedirect, updatePostView } from '../utils/utils';
import { SkeletonPost } from '../common/Skeleton';
import { icons } from '../common/content';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Tooltip,
} from "@material-tailwind/react";
import InfiniteScroll from 'react-infinite-scroll-component';

const SV_URL = import.meta.env.VITE_SV_URL;

const SubCategoryPage = () => {
  const { categoryName } = useParams();
  const [categoryPosts, setCategoryPosts] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(1); 
  const [page, setPage] = useState(1);

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


  const fetchPosts = async (page, categoryName) => {
    try {
      const response = await axios.get(`${SV_URL}/postsByCategory`, {
        params: {
          categoryName: categoryName,
          page: page,
        },
      });
  
      const retrievedCategoryPosts = response.data;
  
      if (retrievedCategoryPosts.length > 0) {
        if (page === 1) {
          setCategoryPosts(retrievedCategoryPosts); // clear the state for the first page
        } else {
          setCategoryPosts((prevCategoryPosts) => [
            ...prevCategoryPosts,
            ...retrievedCategoryPosts,
          ]);
        }
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  useEffect(() => {
    fetchPosts(1, categoryName); // fetch the first page of data
  }, [categoryName]); // only call the effect when the categoryName changes
  
  const fetchMorePosts = async () => {
    const nextPage = page + 1; // increment the page parameter
    setNextPage(nextPage)
    await fetchPosts(nextPage, categoryName);
    setPage(nextPage);
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
  

  const renderLoadingPosts = Array.from({ length: nextPage }).map((_, index) => (
    <SkeletonPost key={index} />
  ));
  if (isLoading || !categoryPosts || categoryPosts.length === 0) {
    return (
      <div className="container px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-40">
          {renderLoadingPosts}          
      </div>
    );
  }

  const renderPosts = categoryPosts.map((post, index) => (
    <Card variant='gradient' color='gray' className="w-full border-2 border-gray-800 text-gray-500" key={index}>
    <CardBody>
              <div className="mb-2 flex flex-col items-start space-y-4">
                <div className='flex flex-row items-center justify-between w-full'>
                  <Typography variant='lead' color="white" className="font-bold capitalize">
                    {post.post_title}
                  </Typography>
                  <div className='flex flex-row items-center justify-between gap-6'>

                  <Tooltip content={post.post_category} className='bg-orange-400 capitalize' >
                    <icons.TagIcon className='h-5 w-5' stroke='gray' />
                  </Tooltip>
                  <Tooltip content="Save the Post" className='bg-gray-400 capitalize'>
              <icons.BookmarkIcon
                className='h-5 w-5 cursor-pointer'
                fill={post.isBookmarked ? 'gray' : 'none'}
                onClick={() => handleBookmarkClick(post.id)}
              />
            </Tooltip>
                  </div>

                </div>
                <Typography variant='paragraph'>
                  {truncateDescription(post.post_description, 120)}
                </Typography>
              </div>

            </CardBody>

            <CardFooter className="pt-0 flex items-start gap-4">
              <Button
                onClick={() => handlePostClick(post.id)}
                >
                Read More
              </Button>
              <Link onClick={() => handleRedirect(post.post_link)} target="_blank" rel="noopener noreferrer">
                <Button>
                  Visit Website
                </Button>
              </Link>
            </CardFooter>
          </Card>
    ));

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
      <Typography variant='h3' color='white' className='capitalize font-bold '>Posts in {categoryName}</Typography>
      <Link to="/categories">
      <Button>
              Go Back To Categories
      </Button>
      </Link>
      </div>
      <InfiniteScroll
        dataLength={categoryPosts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        scrollThreshold={0.6} 
        loader={<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-10'>{renderLoadingPosts}</div>} 
      >
      <ul className="gap-10 lg:grid-cols-2 md:grid-cols-2 grid grid-cols-1">  
          {renderPosts}
      </ul>
      </InfiniteScroll>
    </div>
  );
};

export default SubCategoryPage;
