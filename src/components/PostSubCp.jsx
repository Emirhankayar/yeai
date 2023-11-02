// PostSubCp.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SkeletonPost, PgTitle, PgButton } from '../common/Skeleton'
import { updatePostView, handleRedirect } from '../utils/utils';
import { PostCard, SinglePostCard } from '../common/Card';

const SV_URL = import.meta.env.VITE_SV_URL;


const PostDetailsPage = () => {
  const { categoryName, postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
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

  return (
    <div className="container mx-auto px-10 space-y-20">
      <div>
        <div className='flex flex-row items-center justify-between mb-10'>

          <Link to={`/categories/${categoryName}`}>
            <PgButton
              text={`(${categoryName})`}
            />
          </Link>
        </div>


        <SinglePostCard
        post={post}
        handleBookmarkClick={handleBookmarkClick}
        handlePostClick={handlePopularPostClick}
        handleRedirect={handleRedirect}
      />
      </div>

      <PgTitle text={`Popular Posts in ${categoryName.toUpperCase()}`} />

      <ul className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
      {popularPosts.map((popularPost, index) => (
          <PostCard
          key={index}
          post={popularPost}
          handleBookmarkClick={handleBookmarkClick}
          handlePostClick={handlePopularPostClick}
          handleRedirect={handleRedirect}
        />
          ))}
      </ul>
    </div>
  );
};

export default PostDetailsPage;