// PostSubCp.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { truncateDescription, handleRedirect } from '../utils/utils';
import { SkeletonPost } from '../common/Skeleton'
import { icons } from '../common/content'
import { updatePostView } from '../utils/utils';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";

const SV_URL = import.meta.env.VITE_SV_URL;


const PostDetailsPage = () => {
  const { categoryName, postId } = useParams();
  const [post, setPost] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleBookmarkClick = (id, isPopular) => {
    if (isPopular) {
      setPopularPosts((prevPopularPosts) =>
        prevPopularPosts.map((popularPost) =>
          popularPost.id === id
            ? { ...popularPost, isBookmarked: !popularPost.isBookmarked }
            : popularPost
        )
      );
    } else if (post && post.id === id) {
      setPost((prevPost) => ({ ...prevPost, isBookmarked: !prevPost.isBookmarked }));
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${SV_URL}/postById/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchPopularData = async () => {
      try {
        const response = await axios.get(`${SV_URL}/popularPosts/${categoryName}`);
        const allPopulars = response.data;
        const filteredPopulars = allPopulars.filter((popularPost) => popularPost.id !== postId);
        const displayedPopulars = filteredPopulars.length > 0 ? filteredPopulars.slice(0, Math.min(filteredPopulars.length, 4)) : [];
        setPopularPosts(displayedPopulars);
      } catch (error) {
        console.error('Error fetching popular posts:', error);
      }
    };

    fetchPostData();
    fetchPopularData();
  }, [categoryName, postId]);




  const handlePopularPostClick = async (postId, postView) => {
    try {
      await updatePostView(postId, postView);
      navigate(`/categories/${categoryName}/${postId}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error updating post view:', error);
    }
  };


  const renderLoadingPosts = Array.from({ length: 4 }).map((_, index) => (
    <SkeletonPost key={index} />
  ));


  if (isLoading || !post) {
    return (
      <div className="container mx-auto px-10 space-y-20">
        {renderLoadingPosts}
      </div>
    );
  }

  const renderPosts = popularPosts.map((popularPost, index) => (
    <Card variant='gradient' color='gray' className="w-full border-2 border-gray-800 text-gray-500" key={index}>
      <CardBody>
        <div className="mb-2 flex flex-col items-start space-y-4">
          <div className='flex flex-row items-center justify-between w-full'>
            <Typography variant='lead' color="white" className="font-bold capitalize">
              {popularPost.post_title}
            </Typography>

            <div className='flex flex-row items-center justify-between gap-6'>

              <Tooltip content={popularPost.post_category} className='bg-orange-400 capitalize' >
                <icons.TagIcon className='h-5 w-5' stroke='gray' />
              </Tooltip>
              <Tooltip
                content="Save the Post"
                className="bg-gray-400 capitalize"
                key={popularPost.id} // Ensure to add a unique key for each element
              >
                <icons.BookmarkIcon
                  className="h-5 w-5 cursor-pointer"
                  fill={popularPost.isBookmarked ? 'gray' : 'none'}
                  onClick={() => handleBookmarkClick(popularPost.id, true)} // Pass 'true' for isPopular
                />
              </Tooltip>
            </div>

          </div>
          <Typography variant='paragraph'>
            {truncateDescription(popularPost.post_description, 120)}
          </Typography>
        </div>
      </CardBody>

      <CardFooter className="pt-0 flex items-start gap-4">
        <Button
          onClick={() => handlePopularPostClick(popularPost.id)}
        >
          Read More
        </Button>
        <Link onClick={() => handleRedirect(popularPost.post_link)} target="_blank" rel="noopener noreferrer">
          <Button>
            Visit Website
          </Button>
        </Link>
      </CardFooter>
    </Card>
  ));

  return (
    <div className="container mx-auto px-10 space-y-20">
      <div>
        <div className='flex flex-row  items-center justify-between mb-10'>
          <Typography variant='lead' color='green' textGradient className='capitalize font-bold flex flex-row items-center'>
            <Tooltip content={post.post_title}>
              <icons.EyeIcon className='w-5 h-5 ml-4' stroke='white' />
            </Tooltip>
          </Typography>
          <Link to={`/categories/${categoryName}`}>
            <Button>
              Go back to {categoryName}
            </Button>
          </Link>
        </div>

        <Card variant='gradient' color='gray' className="w-full border-2 border-gray-800 text-gray-500">
          <CardBody>
            <div className="mb-2 flex flex-col items-start space-y-4">
              <div className='flex flex-row items-center justify-between w-full'>

                <Typography variant='h4' color='white' className="font-bold capitalize">
                  {post.post_title}
                </Typography>
                <div className='flex flex-row items-center justify-between gap-6'>

                  <Tooltip content={post.post_category} className='bg-orange-400 capitalize' >
                    <icons.TagIcon className='h-5 w-5' stroke='gray' />
                  </Tooltip>
                  <Tooltip
                    content="Save the Post"
                    className="bg-gray-400 capitalize"
                  >
                    <icons.BookmarkIcon
                      className="h-5 w-5 cursor-pointer"
                      fill={post.isBookmarked ? 'gray' : 'none'}
                      onClick={() => handleBookmarkClick(post.id, false)} // Pass 'false' for isPopular
                    />
                  </Tooltip>
                </div>
              </div>
              <Typography variant='paragraph' className='text-justify'>
                {post.post_description}
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="pt-0 flex items-start gap-4">
          <Link onClick={() => handleRedirect(post.post_link)} target="_blank" rel="noopener noreferrer">
              <Button>
                Visit Website
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Typography variant='h3' color="green" textGradient className="font-bold capitalize">
        Popular Posts in {categoryName}
      </Typography>
      <ul className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
        {renderPosts}
      </ul>
    </div>
  );
};

export default PostDetailsPage;