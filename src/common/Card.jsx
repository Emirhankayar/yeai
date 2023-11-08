import { useContext, useEffect, useState } from 'react';
import { BookmarkContext } from '../services/BookmarkContext';
import PropTypes from 'prop-types';
import Icon from './Icons';
import { Link } from 'react-router-dom';
import MaterialComponent from "./Material";
import { UserContext } from '../services/UserContext';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
  //const [imageUrl, setImageUrl] = useState(null);
  const [ iconUrl, setIconUrl] = useState(null);

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
          //setImageUrl(null); // Set imageUrl to null if image not found or bad request
          setIconUrl(null); // Set iconUrl to null if icon not found or bad request
          throw new Error('No image or icon found or bad request'); // Throw an error to stop the promise chain
        }
       // setImageUrl(response.data.image.publicUrl); // Set the public URL as the image URL
        setIconUrl(response.data.icon.publicUrl); // Set the public URL as the icon URL
      })
      .catch(error => {
        if (!error.message.includes('No image or icon found or bad request')) {
          console.error(error); // Only log the error to the console if it's not one of the expected errors
        }
       // setImageUrl(null); // Set imageUrl to null if there's an error
        setIconUrl(null); // Set iconUrl to null if there's an error
      });
  }, [post.id]);

  const updatePostView = async () => {
    try {
      const response = await axios.put(`${SV_URL}/updatePostView`, {
        postId: post.id,
        post_view: post.post_view,
      });
  
      if (response.status === 200) {
        // Post view updated successfully
      }
    } catch (error) {
      console.error('Error updating post view:', error);
    }
  };

  const handleLinkClick = (link) => {
    updatePostView(post.id, post.post_view);
    handleRedirect(link);
  };
  function formatPostCategory(post_category) {
    return post_category
      .split('-')
      .map(word => {
        if (word === 'and') return word;
        if (word === 'ai') return word.toUpperCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
  const Buttons = () => (
<div className='flex flex-row lg:flex-col items-start justify-center gap-6 mb-2'>
  <div className='order-1 lg:order-2'>
    <Link onClick={() => handleLinkClick(post.post_link)} target="_blank" rel="noopener noreferrer">
      <MaterialComponent component="Button" className="p-2 h-9">
        <Icon icon="ArrowUpRightIcon" stroke="white" className="h-4 w-4"/>
      </MaterialComponent>
    </Link>
  </div>
  <div className='order-2 lg:order-1'>
    {user ? (
      <MaterialComponent component="Button"
        onClick={() => user && handleBookmarkButtonClick({ postId: post.id, user, bookmarks, setBookmarks })}
        className="p-2 h-9"
      >
        <Icon icon={isBookmarked ? 'faSolidBookmark' : 'faRegularBookmark'} 
        color={isBookmarked ? 'white' : 'none'} 
        className="h-4 w-4"/>
      </MaterialComponent>
    ) : (
      <MaterialComponent
        component="Tooltip"
        content="Log in to save the post"
        className="bg-red-400 capitalize"
        key={post.id} 
      >
        <div>
          <MaterialComponent component="Button"
            className="p-2 h-9"
            disabled
          >
            <Icon icon='faRegularBookmark'
            stroke="none" 
            className="h-4 w-4"/>
          </MaterialComponent>
        </div>
      </MaterialComponent>
    )}
  </div>
</div>
  );
//           {imageUrl && <img src={imageUrl} alt="Post" onError={() => setImageUrl('/ms-icon-310x310.png')} className='object-cover object-cover rounded-md'/>}

  return (
    <MaterialComponent component="Card" variant='gradient' color='transparent' className="border-2 border-gray-800 lg:flex-row justify-between">
      
      <MaterialComponent component="CardBody">
        <div className='flex items-center justify-between'>

          <MaterialComponent component="Typography" variant='h6' color="white" className="font-bold capitalize flex gap-2 items-center mb-2">
          {iconUrl && (
              <LazyLoadImage 
                src={iconUrl} 
                alt="Post" 
                onError={() => setIconUrl('/apple-icon-60x60.png')} 
                effect="blur"
                className='w-3 h-3' 
              />
            )}
                   {post.post_title}

        </MaterialComponent>
        <div className=' lg:hidden'>
          
        <Buttons />
        </div>
        </div>
            <MaterialComponent component="Typography" variant='small' className="text-gray-500">
              {post.post_description}
            </MaterialComponent>
      </MaterialComponent>

        <MaterialComponent component="CardFooter" className=" pt-0 lg:pt-5 flex items-start justify-between gap-6">

            <div className='flex flex-col lg:flex-col items-start justify-start gap-4 w-full'>
    
            <MaterialComponent component="Typography" variant='small' className='flex gap-3 items-center'>
              <Icon icon="HashtagIcon" className="h-4 w-4" stroke="orange" />
              {formatPostCategory(post.post_category)}
            </MaterialComponent>
            <MaterialComponent component="Typography" variant='small' className='flex gap-3 items-center'>
                <Icon 
                  icon="CurrencyDollarIcon" 
                  className="h-4 w-4" 
                  stroke={post.post_price === 'Free' ? 'lightgreen' : post.post_price === 'Paid' ? 'red' : 'pink'} 
                />
                {post.post_price}
            </MaterialComponent>    
            <MaterialComponent component="Typography" variant='small' className='flex gap-3 items-center'>
              <Icon icon="EyeIcon" className="h-4 w-4" stroke="whitesmoke" />
              {post.post_view}
            </MaterialComponent> 
                    <MaterialComponent component="Typography" variant='small' className='flex gap-3 items-center'>
              <Icon icon="ClockIcon" className="h-4 w-4" stroke="gray" />
              {formatDate(post.post_added)}
            </MaterialComponent>  
            </div>
          

          <div className='hidden lg:block'>
            <Buttons/>
    
            </div>
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
    post_view: PropTypes.number.isRequired, 
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