import PropTypes from 'prop-types';
import Icon from './Icons';
import { Link } from 'react-router-dom';
import MaterialComponent from "./Material";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function PostCard({ post, handleBookmarkClick, handlePostClick, handleRedirect, truncateDescription = true, showReadMoreButton = true }) {
  return (
    <MaterialComponent component="Card" variant='gradient' color='gray' className="w-full border-2 border-gray-800 text-gray-500">
      <MaterialComponent component="CardBody">
        <div className="mb-2 flex flex-col items-start space-y-4">
          <div className='flex flex-row items-center justify-between w-full'>
          <MaterialComponent component="Typography" variant='h5' color="white" className="font-bold capitalize">
          {post.post_title.length >= 20 ? (
            <MaterialComponent component="Tooltip" content={post.post_title} className="bg-black text-white capitalize">
              {truncateDescription ? post.post_title.substring(0, 12) + '...' : post.post_title}
            </MaterialComponent>
          ) : (
            post.post_title
          )}
        </MaterialComponent>

            <div className='flex flex-row items-center justify-between gap-6'>
              <MaterialComponent
                component="Tooltip"
                content="Save the Post"
                className="bg-gray-400 capitalize"
                key={post.id} 
              >
                <div>
                <Icon 
                  icon="BookmarkIcon"
                  className="h-5 w-5 cursor-pointer"
                  fill={post.isBookmarked ? 'gray' : 'none'}
                  onClick={() => handleBookmarkClick(post.id, true)} 
                  />
                  </div>
              </MaterialComponent>
            </div>

          </div>
            <MaterialComponent component="Typography" variant='paragraph' className="md:h-36 sm:h-20 lg:h-20 h-20">
              {truncateDescription ? post.post_description.substring(0, 120) + '...' : post.post_description}
            </MaterialComponent>
            <div className='flex flex-row items-center justify-start gap-4 w-full'>
            <MaterialComponent component="Typography" variant='paragraph' className='flex gap-1 items-center'>
              <div>
                <Icon icon="ClockIcon" className="h-5 w-5" stroke="gray" />
              </div>
              {formatDate(post.post_added)}
            </MaterialComponent>
            <MaterialComponent component="Tooltip" content={post.post_category} className='bg-orange-400 uppercase'>
              <div>
                <Icon icon="SwatchIcon" className="h-5 w-5" stroke="orange" />
              </div>
            </MaterialComponent>
            <MaterialComponent 
              component="Tooltip" 
              content={post.post_price} 
              className={post.post_price === 'Free' ? 'bg-green-400 uppercase' : post.post_price === 'Paid' ? 'bg-red-400 uppercase' : 'bg-pink-400 uppercase'}
            >
              <div>
                <Icon 
                  icon="BanknotesIcon" 
                  className="h-5 w-5" 
                  stroke={post.post_price === 'Free' ? 'green' : post.post_price === 'Paid' ? 'red' : 'pink'} 
                />
              </div>
            </MaterialComponent>
            </div>
          
        </div>
      </MaterialComponent>

        <MaterialComponent component="CardFooter" className="pt-0 flex items-center justify-between gap-6">
          {showReadMoreButton && (
          <MaterialComponent
            component="Button"
            onClick={() => handlePostClick(post.id)}
            >
            Read More
          </MaterialComponent>
            )}
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
    post_title: PropTypes.string.isRequired,
    post_category: PropTypes.string.isRequired,
    post_description: PropTypes.string.isRequired,
    post_link: PropTypes.string.isRequired,
    post_added: PropTypes.string.isRequired,
    post_price: PropTypes.string.isRequired,
    isBookmarked: PropTypes.bool,
    id: PropTypes.number.isRequired,
  }).isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  handlePostClick: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func.isRequired,
  truncateDescription: PropTypes.bool,
  showReadMoreButton: PropTypes.bool,
};

export function SinglePostCard({ post, handleBookmarkClick, handlePostClick, handleRedirect, showReadMoreButton = false }) {
  return (
    <MaterialComponent component="Card" variant='gradient' color='gray' className="w-full border-2 border-gray-800 text-gray-500">
      <MaterialComponent component="CardBody">
        <div className="mb-2 flex flex-col items-start space-y-4">
          <div className='flex flex-row items-center justify-between w-full'>
          <MaterialComponent component="Typography" variant='h5' color="white" className="font-bold capitalize">
            {post.post_title}
        </MaterialComponent>

            <div className='flex flex-row items-center justify-between gap-6'>

              <MaterialComponent component="Tooltip" content={post.post_category} className='bg-orange-400 uppercase' >
                <div>
              <Icon icon="SwatchIcon" className="h-5 w-5" stroke="gray" />
                </div>
              </MaterialComponent>
              <MaterialComponent
                component="Tooltip"
                content="Save the Post"
                className="bg-gray-400 capitalize"
                key={post.id} 
              > 
                <div>
                <Icon 
                  icon="BookmarkIcon"
                  className="h-5 w-5 cursor-pointer"
                  fill={post.isBookmarked ? 'gray' : 'none'}
                  onClick={() => handleBookmarkClick(post.id, true)} 
                  />
                  </div>
              </MaterialComponent>
            </div>

          </div>
            <MaterialComponent component="Typography" variant='paragraph'>
              {post.post_description}
            </MaterialComponent>
        </div>
      </MaterialComponent>

        <MaterialComponent component="CardFooter" className="pt-0 flex items-start gap-4">
      {showReadMoreButton && (
          <MaterialComponent
            component="Button"
            onClick={() => handlePostClick(post.id)}
          >
            Read More
          </MaterialComponent>
            )}
          <Link onClick={() => handleRedirect(post.post_link)} target="_blank" rel="noopener noreferrer">
            <MaterialComponent component="Button">
              Visit Website
            </MaterialComponent>
          </Link>
        </MaterialComponent>
    </MaterialComponent>
  );
}

SinglePostCard.propTypes = {
  post: PropTypes.shape({
    post_title: PropTypes.string.isRequired,
    post_category: PropTypes.string.isRequired,
    post_description: PropTypes.string.isRequired,
    post_link: PropTypes.string.isRequired,
    isBookmarked: PropTypes.bool,
    id: PropTypes.number.isRequired,
  }).isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  handlePostClick: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func.isRequired,
  truncateDescription: PropTypes.bool,
  showReadMoreButton: PropTypes.bool,
};


export function CategoryCard({ category, handleCategoryClick }) {
  return (
    <MaterialComponent component="Card" variant="gradient" color="gray" className="w-full border-2 border-gray-800 text-gray-500">
      <MaterialComponent component="CardBody">
        <div className="mb-2">
          <MaterialComponent component="Typography" variant="h6" color="white" className="font-semibold uppercase text-center">
            {category}
          </MaterialComponent>
        </div>
      </MaterialComponent>
      <MaterialComponent component="CardFooter" className="pt-0 text-center">
        <MaterialComponent component="Button" onClick={() => handleCategoryClick(category)}>View Posts</MaterialComponent>
      </MaterialComponent>
    </MaterialComponent>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};

export function SearchBar({ value, onChange }) {
  return (
    <MaterialComponent component="Card" variant='gradient' color='gray' className="w-full border-2 border-gray-800 text-gray-500">
    <MaterialComponent component="CardBody" className="flex flex-col gap-10">

    <MaterialComponent 
      component="Input"
      type="text"
      color="white"
      value={value}
      onChange={onChange}
      variant="standard"
      label="Search"
      aria-label="Search"

      />

    <div className='grid grid-cols-1'>
    <label htmlFor="sort" className='text-gray-300 mb-2'>Sort By</label>
    <MaterialComponent component="Label" value="Sort By"/>
    <MaterialComponent component="Radio" name="type" label="A-Z" color="green" className="w-4 h-4" aria-label="Sort by A to Z"/>
    <MaterialComponent component="Radio" name="type" label="Z-A"className="w-4 h-4" aria-label="Sort by Z to A"/>
    <MaterialComponent component="Radio" name="type" label="More Popular"className="w-4 h-4" aria-label="Sort by more popular"/>
    <MaterialComponent component="Radio" name="type" label="Less Popular"className="w-4 h-4" aria-label="Sort by less popular"/>
    </div>
    <div className='grid grid-cols-1'>
    <label htmlFor="sort" className='text-gray-300 mb-2'>Pricing</label>
    <MaterialComponent component="Label" value="Sort By"/>
    <MaterialComponent component="Radio" name="type" label="Free" color="green" className="w-4 h-4" aria-label="Show free options only"/>
    <MaterialComponent component="Radio" name="type" label="Freemium"className="w-4 h-4" aria-label="Show freemium options"/>
    <MaterialComponent component="Radio" name="type" label="Paid" className="w-4 h-4" aria-label="Show paid options only"/>
    </div>

    </MaterialComponent>
    </MaterialComponent>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};



export default { CategoryCard, PostCard, SinglePostCard, SearchBar };