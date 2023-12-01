import React, { useContext, useState } from "react";
import Icon from "./Icons";
import PropTypes from "prop-types";
import { BookmarkContext } from "../services/BookmarkContext";
import { Link } from "react-router-dom";
import MaterialComponent from "./Material";
import { useAuth } from "../services/AuthContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatCategoryName } from "../utils/categoryUtils";
import updatePostView from "../utils/postViewUtils";
import { formatDate } from "../utils/dateUtils";
import axios from "axios";
import { SV_URL } from "../utils/utils";
import "../index.css";

import { IconButton } from "@material-tailwind/react";

function PostCard({ post, handleRedirect, showButtons = true }) {
  const { user } = useAuth();
  const { bookmarks, setBookmarks, handleBookmarkClick } =
    useContext(BookmarkContext);
  const isBookmarked = bookmarks.includes(String(post.id));
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded]= useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = (event) => {
    if (event.target === event.currentTarget) {
      setModalOpen(false);
    }
  };

  const handleSubmitReport = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      console.log("post:", post.post_title);
      console.log("email:", user.email);
      console.log("message:", message);
      await axios.post(`${SV_URL}/report-issue`, {
        post: post.post_title,
        email: user.email,
        message,
      });
      alert("Report sent successfully");
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to send report");
    }
  };

  function sliceDescription(description, length) {
    if (description.length <= length) {
      return description;
    }
  
    const upto = description.slice(0, length).lastIndexOf(' ');
    return description.slice(0, upto) + '...';
  }
  // Update the bookmarkedPosts state when the bookmark button is clicked
  const handleBookmarkButtonClick = () => {
    handleBookmarkClick({ postId: post.id, bookmarks, setBookmarks, user });
  };

  const handleLinkClick = (link) => {
    updatePostView(post);
    handleRedirect(link);
  };

  const ButtonComponent = ({ icon, clickHandler, disabled, fill, color }) => (
    <MaterialComponent
      component="IconButton"
      className="rounded-full"
      onClick={clickHandler}
      color={color}
      disabled={disabled}
    >
      <Icon icon={icon} stroke="white" fill={fill} className="h-4 w-4" />
    </MaterialComponent>
  );
  ButtonComponent.propTypes = {
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    clickHandler: PropTypes.func,
    disabled: PropTypes.bool,
    fill: PropTypes.string,
  };

  // Refactored Buttons component
  const Buttons = () => {
    if (!showButtons) {
      return null;
    }
    const handleButtonClick = (originalHandler, message, loggedInHandler) => {
      if (!user) {
        alert(message);
      } else {
        loggedInHandler && loggedInHandler();
        originalHandler && originalHandler();
      }
    };
    const labelProps = {
      variant: "small",
      color: "white",
      className: "absolute top-0 translate-y-4 -translate-x-16 font-normal",
    };

    return (
      <MaterialComponent component="SpeedDial">
        <MaterialComponent component="SpeedDialHandler">
          <IconButton className="rounded-full h-5 w-5">
            <Icon
              icon="PlusIcon"
              className="h-5 w-5 transition-transform group-hover:rotate-45"
            />
          </IconButton>
        </MaterialComponent>

        <MaterialComponent
          component="SpeedDialContent"
          className="flex-col bg-gray-900 backdrop-blur-sm bg-opacity-60 rounded-md border-[0.5px] border-gray-600 w-36 items-end z-10"
        >
          <MaterialComponent
            component="SpeedDialAction"
            className="relative bg-transparent border-none"
          >
            <Link
              onClick={() => handleLinkClick(post.post_link)}
              aria-label={`Open ${post.post_title} in a new tab.`}
            >
              <ButtonComponent icon="ArrowUpRightIcon" />
            </Link>
            <MaterialComponent component="Typography" {...labelProps}>
              Visit
            </MaterialComponent>
          </MaterialComponent>
          <MaterialComponent
            component="SpeedDialAction"
            className="relative bg-transparent border-none"
          >
            <ButtonComponent
              icon="HeartIcon"
              fill={isBookmarked ? "white" : "none"}
              clickHandler={() =>
                handleButtonClick(
                  handleBookmarkButtonClick,
                  "Sign Up / Log in to use Bookmarks."
                )
              }
            />
            <MaterialComponent component="Typography" {...labelProps}>
              Bookmark
            </MaterialComponent>
          </MaterialComponent>
          <MaterialComponent
            component="SpeedDialAction"
            className="relative bg-transparent border-none"
          >
            <ButtonComponent
              icon="ExclamationCircleIcon"
              fill="none"
              color="red"
              clickHandler={() =>
                handleButtonClick(
                  null,
                  "Sign up / Log in to use report abuse.",
                  handleOpenModal
                )
              }
            />
            <MaterialComponent component="Typography" {...labelProps}>
              Report
            </MaterialComponent>
          </MaterialComponent>
        </MaterialComponent>
      </MaterialComponent>
    );
  };

  return (
    <MaterialComponent
      component="Card"
      color="transparent"
      className="border rounded-md border-gray-800 min-w-full"
    >
      <MaterialComponent
        component="Dialog"
        open={modalOpen}
        onClose={handleCloseModal}
        className="bg-gray-900 min-w-[50px] mx-auto border-gray-800 border-[0.5px] bg-opacity-60"
      >
        <div>
          <MaterialComponent
            component="DialogHeader"
            className="flex items-center justify-between text-white"
          >
            Report Abuse
            <MaterialComponent component="IconButton">
              <Icon
                icon="XMarkIcon"
                stroke="white"
                className="h-4 w-4"
                onClick={(event) => {
                  event.stopPropagation();
                  handleCloseModal(event);
                }}
              />
            </MaterialComponent>
          </MaterialComponent>

          <MaterialComponent component="DialogBody">
            <form onSubmit={handleSubmitReport} className="space-y-4">
              <MaterialComponent
                component="Textarea"
                label="Message"
                value={message}
                className="text-white"
                containerProps={{ className: "min-w-[50px]" }}
                labelProps={{ className: "!text-gray-300" }}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <MaterialComponent component="Button" type="submit">
                Submit
              </MaterialComponent>
            </form>
          </MaterialComponent>
        </div>
      </MaterialComponent>
      <MaterialComponent component="CardBody" className="w-full">
        <div className="flex flex-row items-start justify-between">
          <MaterialComponent
            component="Typography"
            variant="h6"
            as="div"
            color="white"
            className="font-bold capitalize"
            aria-label="post icon and post title"

          >
            <Link
              onClick={() => handleLinkClick(post.post_link)}
              aria-label={`Open ${post.post_title} in a new tab.`}
              className="flex gap-2 items-center mb-4 hover:text-lg hover:text-emerald-900 h-5 duration-200"
            >
              <LazyLoadImage
                aria-label="Post icon"
                src={post.icon && post.icon.publicUrl}
                alt="Post"
                effect="blur"
                className="w-5 h-5"
                onError={(e) => {
                  e.target.src = "/apple-icon-60x60.png";
                }}
              />
              {post.post_title}
            </Link>
          </MaterialComponent>
          <div>
          <Buttons />

          </div>
        </div>

        <MaterialComponent
  component="Typography"
  variant="small"
  as="div"
  className={`relative text-gray-500 ${isExpanded ? '' : 'h-[auto] lg:h-[4rem] md:h-[5rem] overflow-y-none'}`}
  aria-label="post description"
>
  <div>
    {isExpanded ? post.post_description : sliceDescription(post.post_description, 200)}
  </div>
  {post.post_description.length > 200 && (
    <button onClick={toggleExpanded} className="mt-2 text-emerald-900">
      {isExpanded ? 'Read Less' : 'Read More'}
    </button>
  )}
</MaterialComponent>
      </MaterialComponent>

      <MaterialComponent
        component="CardFooter"
        className=" pt-0 lg:pt-5 flex items-start justify-between gap-6 lg:min-w-[200px]"
      >
        <div className="flex flex-col lg:flex-row items-start justify-start gap-4">
          <MaterialComponent
            component="Typography"
            as="div"
            variant="small"
            className="flex shrink-0 gap-2 items-center"
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
            as="div"
            variant="small"
            className="flex gap-2 items-center"
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
            as="div"
            variant="small"
            className="flex gap-2 items-center"
            aria-label="post views"
          >
            <Icon icon="EyeIcon" className="h-4 w-4" stroke="whitesmoke" />
            {post.post_view}
          </MaterialComponent>
          {post.status && (
            <MaterialComponent
              component="Typography"
              as="div"
              variant="small"
              className="flex gap-2 items-center capitalize"
              aria-label="post status"
            >
              {post.status === "pending" && (
                <Icon
                  icon="EllipsisHorizontalCircleIcon"
                  className="h-4 w-4"
                  stroke="yellow"
                />
              )}
              {post.status === "approved" && (
                <Icon
                  icon="CheckCircleIcon"
                  className="h-4 w-4"
                  stroke="green"
                />
              )}
              {post.status === "declined" && (
                <Icon icon="XCircleIcon" className="h-4 w-4" stroke="red" />
              )}
              {post.status}
            </MaterialComponent>
          )}
          <MaterialComponent
            component="Typography"
            as="div"
            variant="small"
            className="flex gap-2 items-center"
            aria-label="post date"
          >
            <Icon icon="ClockIcon" className="h-4 w-4" stroke="gray" />
            {formatDate(post.post_added)}
          </MaterialComponent>
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
    status: PropTypes.oneOf(["pending", "approved", "declined"]),
  }).isRequired,
  showButtons: PropTypes.bool,
  handleRedirect: PropTypes.func.isRequired,
};
const MemoizedPostCard = React.memo(PostCard);

export { MemoizedPostCard as PostCard };
