import PropTypes from 'prop-types';
import { icons } from './content';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Button, Tooltip, Typography } from "@material-tailwind/react";

function PostCard({ post, handleBookmarkClick, handlePostClick, handleRedirect, truncateDescription = true, showReadMoreButton = true }) {
  return (
    <Card variant='gradient' color='gray' className="w-full border-2 border-gray-800 text-gray-500">
      <CardBody>
        <div className="mb-2 flex flex-col items-start space-y-4">
          <div className='flex flex-row items-center justify-between w-full'>
          <Typography variant='h5' color="white" className="font-bold capitalize">
          {post.post_title.length >= 20 ? (
            <Tooltip content={post.post_title} className="bg-black text-white capitalize">
              {truncateDescription ? post.post_title.substring(0, 12) + '...' : post.post_title}
            </Tooltip>
          ) : (
            post.post_title
          )}
        </Typography>

            <div className='flex flex-row items-center justify-between gap-6'>

              <Tooltip content={post.post_category} className='bg-orange-400 uppercase' >
                <icons.SwatchIcon className='h-5 w-5' stroke='gray' />
              </Tooltip>
              <Tooltip
                content="Save the Post"
                className="bg-gray-400 capitalize"
                key={post.id} 
              >
                <icons.BookmarkIcon
                  className="h-5 w-5 cursor-pointer"
                  fill={post.isBookmarked ? 'gray' : 'none'}
                  onClick={() => handleBookmarkClick(post.id, true)} 
                />
              </Tooltip>
            </div>

          </div>
            <Typography variant='paragraph' className='md:h-28 lg:h-16'>
              {truncateDescription ? post.post_description.substring(0, 120) + '...' : post.post_description}
            </Typography>
        </div>
      </CardBody>

      {showReadMoreButton && (
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
      )}
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    post_title: PropTypes.string.isRequired,
    post_category: PropTypes.string.isRequired,
    post_description: PropTypes.string.isRequired,
    post_link: PropTypes.string.isRequired,
    isBookmarked: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  handlePostClick: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func.isRequired,
  truncateDescription: PropTypes.bool,
  showReadMoreButton: PropTypes.bool,
};

export default PostCard;