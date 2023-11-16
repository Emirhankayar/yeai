import { useContext, useEffect, useState } from 'react';
import MaterialComponent from '../common/Material';
import { PostCard } from '../common/Card';
import { handleRedirect } from '../utils/redirectUtils';
import { handleBookmarkClick } from '../utils/bookmarkUtils';
import { BookmarkContext } from '../services/BookmarkContext';
import { SimplePagination } from '../common/Pagination';
import axios from 'axios';
import { SV_URL } from '../utils/utils';
import { useAuth } from '../services/AuthContext';
export default function AccountPg() {
  const { user } = useAuth();
  const { setBookmarks, bookmarks } = useContext(BookmarkContext);
  const [addedPosts, setAddedPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [bookmarkedPage, setBookmarkedPage] = useState(1);
  const [bookmarkedTotalPages, setBookmarkedTotalPages] = useState(1);
  const [addedPage, setAddedPage] = useState(1);
  const [addedTotalPages, setAddedTotalPages] = useState(1);

  useEffect(() => {
    axios.get(`${SV_URL}/added-posts/${user.id}?page=${addedPage}`)
      .then(response => {
        const data = response.data;
        if (Array.isArray(data.addedPosts)) {
          setAddedPosts(data.addedPosts);
          setAddedTotalPages(data.totalPages);
        }
      });
      
    if (bookmarks.length > 0) {
      const bookmarksString = bookmarks.join(',');
      axios.get(`${SV_URL}/bookmarked-posts/${bookmarksString}?page=${bookmarkedPage}`)
        .then(response => {
          const data = response.data;
          if (Array.isArray(data.bookmarkedPosts)) {
            setBookmarkedPosts(data.bookmarkedPosts);
            setBookmarkedTotalPages(data.totalPages);
          }
        });
    }
  }, [user.id, addedPage, bookmarkedPage, bookmarks]);

  return (
    <div className="container px-10 mt-20">
      <MaterialComponent component="Typography" variant="h1" color="white">Account</MaterialComponent>
      <div className="grid grid-cols-1 gap-40 mt-10">

        <div className="gap-10 ">
          <div className="grid grid-cols-1 gap-10">
            <MaterialComponent component="Typography" variant="h3" textGradient color="green">Bookmarks</MaterialComponent>
            {bookmarkedPosts && bookmarkedPosts.map((post) => (
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
                favicon={post.icon} // Pass the favicon URL as a prop
              />
))}
          </div>
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
            <div className="flex flex-row justify-between">
              <MaterialComponent component="Typography" variant="h3" textGradient color="green">Uploads</MaterialComponent>
            </div>

            <div className="grid grid-cols-1 gap-10">

              {addedPosts && addedPosts.map((post) => (
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
                favicon={post.icon} // Pass the favicon URL as a prop
              />
))}
<SimplePagination
  active={addedPage}
  next={() => {
    if (addedPage < addedTotalPages) {
      setAddedPage(addedPage + 1);
    }
  }}
  prev={() => {
    if (addedPage> 1) {
    setAddedPage(addedPage- 1);
    }
  }}
  totalPages={addedTotalPages}
/>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}