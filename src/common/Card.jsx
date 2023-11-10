import { useContext } from "react";
import Icon from "./Icons";
import PropTypes from "prop-types";
import { BookmarkContext } from "../services/BookmarkContext";
import { Link } from "react-router-dom";
import MaterialComponent from "./Material";
import { UserContext } from "../services/UserContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { formatCategoryName } from "../utils/categoryUtils";
import updatePostView from "../utils/postViewUtils";
import { formatDate } from "../utils/dateUtils";

export function PostCard({ post, handleRedirect }) {
  const user = useContext(UserContext);
  const { bookmarks, setBookmarks, handleBookmarkClick } =
    useContext(BookmarkContext);

  // Determine whether the post is bookmarked
  const isBookmarked = bookmarks.includes(String(post.id));

  // Update the bookmarkedPosts state when the bookmark button is clicked
  const handleBookmarkButtonClick = () => {
    handleBookmarkClick({ postId: post.id, bookmarks, setBookmarks, user });
  };

  const handleLinkClick = (link) => {
    updatePostView(post);
    handleRedirect(link);
  };

  const Buttons = () => (
    <div className="flex flex-row lg:flex-col items-start justify-center gap-6 mb-2">
      <div className="order-1 lg:order-2">
        <Link
          onClick={() => handleLinkClick(post.post_link)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${post.post_title} in a new tab.`}
        >
          <MaterialComponent component="Button" className="p-2 h-9">
            <Icon icon="ArrowUpRightIcon" stroke="white" className="h-4 w-4" />
          </MaterialComponent>
        </Link>
      </div>
      <div className="order-2 lg:order-1">
        {user ? (
          <MaterialComponent
            component="Button"
            aria-label={`Bookmark the post ${post.post_title}`}
            onClick={() =>
              user &&
              handleBookmarkButtonClick({
                postId: post.id,
                user,
                bookmarks,
                setBookmarks,
              })
            }
            className="p-2 h-9"
          >
            <Icon
              icon={isBookmarked ? "faSolidBookmark" : "faRegularBookmark"}
              color={isBookmarked ? "white" : "none"}
              className="h-4 w-4"
            />
          </MaterialComponent>
        ) : (
          <MaterialComponent
            component="Tooltip"
            content="Log in to save the post"
            className="bg-red-400 capitalize"
            aria-label="log in to bookmark the post"
            key={post.id}
          >
            <div>
              <MaterialComponent
                component="Button"
                className="p-2 h-9"
                disabled
              >
                <Icon
                  icon="faRegularBookmark"
                  stroke="none"
                  className="h-4 w-4"
                />
              </MaterialComponent>
            </div>
          </MaterialComponent>
        )}
      </div>
    </div>
  );

  return (
    <MaterialComponent
      component="Card"
      variant="gradient"
      color="transparent"
      className="border-2 border-gray-800 lg:flex-row justify-between lg:max-w-[900px]"
    >
      <MaterialComponent component="CardBody" className="max-w-[600px]">
        <div className="flex items-center justify-between">
          <MaterialComponent
            component="Typography"
            variant="h6"
            color="white"
            className="font-bold capitalize flex gap-2 items-center mb-2"
            aria-label="post icon and post title"
          >
            <LazyLoadImage
              aria-label="Post icon"
              src={post.icon && post.icon.publicUrl}
              alt="Post"
              effect="blur"
              className="w-3 h-3"
              onError={(e) => {
                e.target.src = "/apple-icon-60x60.png";
              }}
            />
            {post.post_title}
          </MaterialComponent>
          <div className=" lg:hidden">
            <Buttons />
          </div>
        </div>
        <MaterialComponent
          component="Typography"
          variant="small"
          className="text-gray-500"
          aria-label="post description"
        >
          {post.post_description}
        </MaterialComponent>
      </MaterialComponent>

      <MaterialComponent
        component="CardFooter"
        className=" pt-0 lg:pt-5 flex items-start justify-between gap-6 lg:w-[300px]"
      >
        <div className="flex flex-col lg:flex-col items-start justify-start gap-4">
          <MaterialComponent
            component="Typography"
            variant="small"
            className="flex shrink- gap-3 items-center"
            aria-label="Post Category"
          >
            <div className="flex-shrink-0 h-4 w-4">
              <Icon
                icon="HashtagIcon"
                className="h-full w-full"
                stroke="orange"
              />
            </div>
            {formatCategoryName(post.post_category)}
          </MaterialComponent>
          <MaterialComponent
            component="Typography"
            variant="small"
            className="flex gap-3 items-center"
            aria-label="post price"
          >
            <Icon
              icon="CurrencyDollarIcon"
              className="h-4 w-4"
              stroke={
                post.post_price === "Free"
                  ? "lightgreen"
                  : post.post_price === "Paid"
                  ? "red"
                  : "pink"
              }
            />
            {post.post_price}
          </MaterialComponent>
          <MaterialComponent
            component="Typography"
            variant="small"
            className="flex gap-3 items-center"
            aria-label="post views"
          >
            <Icon icon="EyeIcon" className="h-4 w-4" stroke="whitesmoke" />
            {post.post_view}
          </MaterialComponent>
          <MaterialComponent
            component="Typography"
            variant="small"
            className="flex gap-3 items-center"
            aria-label="post date"
          >
            <Icon icon="ClockIcon" className="h-4 w-4" stroke="gray" />
            {formatDate(post.post_added)}
          </MaterialComponent>
        </div>

        <div className="hidden lg:block">
          <Buttons />
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
    icon: PropTypes.shape({
      publicUrl: PropTypes.string,
    }),
  }).isRequired,
  handleRedirect: PropTypes.func.isRequired,
};

export default { PostCard };
