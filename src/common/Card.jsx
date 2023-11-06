import { useContext, useEffect, useState } from 'react';
import { BookmarkContext } from '../services/BookmarkContext';
import PropTypes from 'prop-types';
import Icon from './Icons';
import { Link } from 'react-router-dom';
import MaterialComponent from "./Material";
import { UserContext } from '../services/UserContext';
import axios from 'axios';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

const SV_URL = import.meta.env.VITE_SV_URL;

export function PostCard({ post, handleRedirect }) {
  const user = useContext(UserContext);
  const { bookmarks, setBookmarks, handleBookmarkClick } = useContext(BookmarkContext);
  const [imageUrl, setImageUrl] = useState(null);

  // Determine whether the post is bookmarked
  const isBookmarked = bookmarks.includes(String(post.id));

  // Update the bookmarkedPosts state when the bookmark button is clicked
  const handleBookmarkButtonClick = () => {
    handleBookmarkClick({postId: post.id, bookmarks, setBookmarks, user});
  };

  useEffect(() => {
    const url = `${SV_URL}/postImage/${post.id}`;
    axios.get(url)
      .then(response => {
        if (response.status === 204 || response.status === 400) {
          setImageUrl(null); // Set imageUrl to null if image not found or bad request
          throw new Error('No image found or bad request'); // Throw an error to stop the promise chain
        }
        setImageUrl(response.data.publicUrl); // Set the public URL as the image URL
      })
      .catch(error => {
        if (!error.message.includes('No image found or bad request')) {
          console.error(error); // Only log the error to the console if it's not one of the expected errors
        }
        setImageUrl(null); // Set imageUrl to null if there's an error
      });
  }, [post.id]);

  return (
    <MaterialComponent component="Card" variant='gradient' color='transparent' className="w-full border-2 border-gray-800 text-gray-500">
      <MaterialComponent component="CardBody">
        <div className="mb-2 flex flex-col items-start space-y-4">
          <div className='flex flex-row items-center justify-between w-full'>
          <MaterialComponent component="Typography" variant='h6' color="white" className="font-bold capitalize flex gap-2 items-center">
          {imageUrl && <img src={imageUrl} alt="Post" onError={() => setImageUrl(null)} className='w-3 h-3' />}            {post.post_title}

        </MaterialComponent>

            <div className='flex flex-row items-center justify-between gap-6'>
            <MaterialComponent
              component="Tooltip"
              content={user ? "Save the Post" : "Log in to save the post"}
              className={user ? "bg-gray-400 capitalize" : "bg-red-400 capitalize"}
              key={post.id} 
            >
              <div>
              <Icon 
                icon={isBookmarked ? 'faSolidBookmark' : 'faRegularBookmark'}
                className="h-5 w-5 cursor-pointer"
                color={isBookmarked ? 'black' : 'none'}
                onClick={() => user && handleBookmarkButtonClick({ postId: post.id, user, bookmarks, setBookmarks })}
              />
              </div>
            </MaterialComponent>
            </div>

          </div>
            <MaterialComponent component="Typography" variant='small'>
              {post.post_description}
            </MaterialComponent>
            <div className='flex flex-row items-center justify-start gap-4 w-full'>
            <MaterialComponent component="Typography" variant='small' className='flex gap-1 items-center'>
              <Icon icon="ClockIcon" className="h-4 w-4" stroke="gray" />
              {formatDate(post.post_added)}
            </MaterialComponent>
            <MaterialComponent component="Typography" variant='small' className='flex gap-1 items-center'>
                <Icon icon="HashtagIcon" className="h-4 w-4" stroke="orange" />
                {post.post_category}
            </MaterialComponent>
            <MaterialComponent component="Typography" variant='small' className='flex gap-1 items-center'>
                <Icon 
                  icon="BanknotesIcon" 
                  className="h-5 w-5" 
                  stroke={post.post_price === 'Free' ? 'lightgreen' : post.post_price === 'Paid' ? 'red' : 'pink'} 
                />
                {post.post_price}
            </MaterialComponent>       
            </div>
          
        </div>
      </MaterialComponent>

        <MaterialComponent component="CardFooter" className="pt-0 flex items-center justify-between gap-6">
          <Link onClick={() => handleRedirect(post.post_link)} target="_blank" rel="noopener noreferrer">
            <MaterialComponent component="Button">
              Visit Website
            </MaterialComponent>
          </Link>
        </MaterialComponent>
    </MaterialComponent>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.object,
    post_title: PropTypes.string.isRequired,
    post_category: PropTypes.string.isRequired,
    post_description: PropTypes.string.isRequired,
    post_link: PropTypes.string.isRequired,
    post_added: PropTypes.string.isRequired,
    post_price: PropTypes.string.isRequired,
    isBookmarked: PropTypes.bool,
    id: PropTypes.number.isRequired,
  }).isRequired,
  handleRedirect: PropTypes.func.isRequired,
};



export function CategoryCard({ category, handleCategoryClick }) {
  return (
    <MaterialComponent
      component="Option"
      className="bg-transparent gap-2 hover:bg-emerald-600 duration-300 ease-in-out"
      onClick={() => handleCategoryClick(category.original)}
    >
      <div className='flex gap-2 items-center'>

      <Icon icon="Squares2X2Icon" className="w-3 h-3" />
      {category.modifiedName}
      </div>
    </MaterialComponent>
  );
}
CategoryCard.propTypes = {
  category: PropTypes.shape({
    original: PropTypes.string,
    modifiedName: PropTypes.string
  }).isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};

export function SearchBar({ value, onChange }) {
  return (
          <MaterialComponent 
            component="Input"
            type="text"
            color="white"
            value={value}
            onChange={onChange}
            variant="outlined"
            label="Search"
            size="md"
            aria-label="Search"
            containerProps={{ className: "min-w-[50px]" }}
          />
   );
 }

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};



export default { CategoryCard, PostCard, SearchBar };