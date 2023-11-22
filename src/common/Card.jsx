import React, { useContext, useEffect, useRef, useState } from "react";
import Icon from "./Icons";
import PropTypes from "prop-types";
import { BookmarkContext } from "../services/BookmarkContext";
import { Link } from "react-router-dom";
import MaterialComponent from "./Material";
import { useAuth } from "../services/AuthContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { truncateDescription } from "../utils/truncateUtils";
import { formatCategoryName } from "../utils/categoryUtils";
import updatePostView from "../utils/postViewUtils";
import { formatDate } from "../utils/dateUtils";
import axios from "axios";
import { SV_URL } from "../utils/utils";
import "../index.css";

import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function PostCard({ post, handleRedirect, showButtons = true }) {
  const { user } = useAuth();
  const { bookmarks, setBookmarks, handleBookmarkClick } =
    useContext(BookmarkContext);

  // Determine whether the post is bookmarked
  const isBookmarked = bookmarks.includes(String(post.id));
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

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
      await axios.post(`${SV_URL}/report-issue`, {
        post: post.post_title,
        message,
        email,
      });
      alert("Report sent successfully");
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to send report");
    }
  };

  const postRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      const scrollDistance = currentScrollPosition - scrollPosition;

      if (Math.abs(scrollDistance) > 50) {
        setIsExpanded(false);
      }

      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

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
      className: "absolute bottom-0 translate-y-5 -translate-x-0 font-normal",
    };

    return (
      <SpeedDial placement="left" offset={{ crossAxis: -60 }}>
        <SpeedDialHandler>
          <IconButton className="rounded-full h-5 w-5">
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>

        <SpeedDialContent className="gap-16 flex-row h-60 px-10">
          <SpeedDialAction className="relative bg-transparent border-none">
            <Link
              onClick={() => handleLinkClick(post.post_link)}
              aria-label={`Open ${post.post_title} in a new tab.`}
            >
              <ButtonComponent icon="ArrowUpRightIcon" />
            </Link>
            <Typography {...labelProps}>Visit</Typography>
          </SpeedDialAction>
          <SpeedDialAction className="relative bg-transparent border-none">
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
            <Typography {...labelProps}>Bookmark</Typography>
          </SpeedDialAction>
          <SpeedDialAction className="relative bg-transparent border-none">
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
            <Typography {...labelProps}>Report</Typography>
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    );
  };

  return (
    <MaterialComponent
      component="Card"
      variant="gradient"
      color="transparent"
      className="border-2 border-gray-800 lg:flex-row justify-between gap-0 lg:min-w-[48rem]"
    >
      <MaterialComponent
        component="Dialog"
        open={modalOpen}
        onClose={handleCloseModal}
        className="max-w-lg bg-gray-900 border-gray-800  border-2 bg-opacity-80 custom-dialog-list"
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
                component="Input"
                label="Your Email"
                className="text-white"
                containerProps={{ className: "text-white" }}
                labelProps={{ className: "text-white" }}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MaterialComponent
                component="Textarea"
                label="Message"
                value={message}
                className="text-white"
                containerProps={{ className: "text-white" }}
                labelProps={{ className: "text-white" }}
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
      <MaterialComponent component="CardBody" className="max-w-[600px]">
        <div className="flex flex-row items-start justify-between w-full">
          <MaterialComponent
            component="Typography"
            variant="h6"
            as="div"
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
          <Buttons />
        </div>
        <div
          className={`overflow-hidden animation-text-height duration-500 ease-in-out ${
            isExpanded ? "max-h-full" : "max-h-32"
          }`}
        >
          <MaterialComponent
            component="Typography"
            variant="small"
            as="div"
            className="text-gray-500"
            aria-label="post description"
            ref={postRef}
          >
            {isExpanded || post.post_description.length <= 200
              ? post.post_description
              : truncateDescription(post.post_description, 200)}
          </MaterialComponent>
          {truncateDescription(post.post_description, 300).length > 200 &&
            !isExpanded && (
              <MaterialComponent
                component="Button"
                color="gray"
                onClick={() => setIsExpanded(true)}
                className="!bg-none !shadow-none capitalize text-[10px] p-0"
              >
                Read more
              </MaterialComponent>
            )}
        </div>
      </MaterialComponent>

      <MaterialComponent
        component="CardFooter"
        className=" pt-0 lg:pt-5 flex items-start justify-between gap-6 lg:min-w-[200px]"
      >
        <div className="flex flex-col lg:flex-col items-start justify-start gap-4">
          <MaterialComponent
            component="Typography"
            as="div"
            variant="small"
            className="flex shrink-0 gap-3 items-center"
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
            as="div"
            variant="small"
            className="flex gap-3 items-center"
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
              className="flex gap-3 items-center capitalize"
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
            className="flex gap-3 items-center"
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
