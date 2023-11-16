import { useContext, useEffect, useState } from "react";
import MaterialComponent from "../common/Material";
import { PostCard } from "../common/Card";
import { handleRedirect } from "../utils/redirectUtils";
import { handleBookmarkClick } from "../utils/bookmarkUtils";
import { BookmarkContext } from "../services/BookmarkContext";
import { SimplePagination } from "../common/Pagination";
import axios from "axios";
import { SV_URL } from "../utils/utils";
import { useAuth } from "../services/AuthContext";
import { debounce } from "lodash";

export default function AccountPg() {
  const { user } = useAuth();
  const { setBookmarks, bookmarks } = useContext(BookmarkContext);
  const [addedPosts, setAddedPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [bookmarkedPage, setBookmarkedPage] = useState(1);
  const [bookmarkedTotalPages, setBookmarkedTotalPages] = useState(1);
  const [addedPage, setAddedPage] = useState(1);
  const [addedTotalPages, setAddedTotalPages] = useState(1);

  const fetchAddedPosts = debounce((userId, page) => {
    axios
      .get(`${SV_URL}/added-posts/${userId}?page=${page}`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data.addedPosts)) {
          setAddedPosts(data.addedPosts);
          setAddedTotalPages(data.totalPages);
        }
      });
  }, 500); // 500ms delay
  
  const fetchBookmarkedPosts = debounce((bookmarksString, page) => {
    axios
      .get(`${SV_URL}/bookmarked-posts/${bookmarksString}?page=${page}`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data.bookmarkedPosts)) {
          setBookmarkedPosts(data.bookmarkedPosts);
          setBookmarkedTotalPages(data.totalPages);
        }
      });
  }, 500); // 500ms delay
  useEffect(() => {
    if (user) {
      fetchAddedPosts(user.id, addedPage);
  
      if (bookmarks.length > 0) {
        const bookmarksString = bookmarks.join(",");
        fetchBookmarkedPosts(bookmarksString, bookmarkedPage);
      }
    }
  }, [user, addedPage, bookmarkedPage, bookmarks]);

  return (
    <div className="container px-10 w-full place-content-center grid mt-20">
      <MaterialComponent component="Typography" variant="h1" color="white">
        Account
      </MaterialComponent>
      <div className="grid grid-cols-1 gap-40 mt-10">

          <div className="grid grid-cols-1 gap-10">
            <MaterialComponent
              component="Typography"
              variant="h3"
              textGradient
              color="green"
            >
              Bookmarks
            </MaterialComponent>
            <div className="grid place-content-center w-full">
              <SimplePagination
                active={bookmarkedPage}
                next={() => {
                  if (bookmarkedPage < bookmarkedTotalPages) {
                    setBookmarkedPage(bookmarkedPage + 1);
                  }
                }}
                prev={() => {
                  if (bookmarkedPage > 1) {
                    setBookmarkedPage(bookmarkedPage - 1);
                  }
                }}
                totalPages={bookmarkedTotalPages}
              />
            </div>
            {bookmarkedPosts &&
              bookmarkedPosts.map((post) => (
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
              ))}
          </div>
          <div className="grid place-content-center w-full">
            <SimplePagination
              active={bookmarkedPage}
              next={() => {
                if (bookmarkedPage < bookmarkedTotalPages) {
                  setBookmarkedPage(bookmarkedPage + 1);
                }
              }}
              prev={() => {
                if (bookmarkedPage > 1) {
                  setBookmarkedPage(bookmarkedPage - 1);
                }
              }}
              totalPages={bookmarkedTotalPages}
            />
          </div>


        <div>
          <div className="grid grid-cols-1 gap-10 ">
            <MaterialComponent
              component="Typography"
              variant="h3"
              textGradient
              color="green"
            >
              Uploads
            </MaterialComponent>
            <div className="grid place-content-center w-full">
              <SimplePagination
                active={addedPage}
                next={() => {
                  if (addedPage < addedTotalPages) {
                    setAddedPage(addedPage + 1);
                  }
                }}
                prev={() => {
                  if (addedPage > 1) {
                    setAddedPage(addedPage - 1);
                  }
                }}
                totalPages={addedTotalPages}
              />
            </div>

            <div className="grid grid-cols-1 w-full gap-10">
              {addedPosts &&
                addedPosts.map((post) => (
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
                    showButtons={false}
                    handleRedirect={handleRedirect}
                    favicon={post.icon} // Pass the favicon URL as a prop
                  />
                ))}
              <div className="grid place-content-center w-full">
                <SimplePagination
                  active={addedPage}
                  next={() => {
                    if (addedPage < addedTotalPages) {
                      setAddedPage(addedPage + 1);
                    }
                  }}
                  prev={() => {
                    if (addedPage > 1) {
                      setAddedPage(addedPage - 1);
                    }
                  }}
                  totalPages={addedTotalPages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
