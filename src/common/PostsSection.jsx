import PropTypes from "prop-types";
import { useContext } from "react";
import { SimplePagination } from "./Pagination";
import { PostCard } from "./Card";
import LoadingPosts from "./LoadingPosts";
import { handleBookmarkClick } from "../utils/bookmarkUtils";
import { useAuth } from "../services/AuthContext";
import { handleRedirect } from "../utils/redirectUtils";
import { BookmarkContext } from "../services/BookmarkContext";


export default function PostsSection({ posts, totalPages, currentPage, setPage, isLoading }) {
    const { user } = useAuth();
    const { bookmarks, setBookmarks } = useContext(BookmarkContext)

    return (
      <div className="grid grid-cols-1 gap-10">
        <div className="grid place-content-center w-full">
          <SimplePagination
            active={currentPage}
            next={() => {
              if (currentPage < totalPages) {
                setPage(currentPage + 1);
              }
            }}
            prev={() => {
              if (currentPage > 1) {
                setPage(currentPage - 1);
              }
            }}
            totalPages={totalPages}
          />
        </div>
        {isLoading ? (
          <div className="container gap-10 grid grid-cols-1">
            <LoadingPosts count={5} />
          </div>
        ) : (
          posts &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              handleBookmarkClick={() =>
                handleBookmarkClick({
                  postId: post.id,
                  bookmarks,
                  setBookmarks,
                  user,
                })
              }
              handleRedirect={handleRedirect}
              favicon={post.icon}
            />
          ))
        )}
      </div>
    );
  }

  PostsSection.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };