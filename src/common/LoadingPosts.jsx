import PropTypes from 'prop-types';
import { SkeletonPost } from "../common/Skeleton";

const LoadingPosts = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonPost key={index} />
      ))}
    </>
  );
};

LoadingPosts.propTypes = {
  count: PropTypes.number.isRequired,
};

export default LoadingPosts;