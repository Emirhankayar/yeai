import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useBookmarks } from '../hooks/useBookmarks';
import { UserContext } from '../services/UserContext';
import MaterialComponent from '../common/Material';
import { PostCard } from '../common/Card';
import Icon from '../common/Icons';
import { handleRedirect } from '../utils/redirectUtils';
import { handleBookmarkClick } from '../utils/bookmarkUtils';
import { SV_URL } from '../utils/utils';
import { SimplePagination } from '../common/Pagination';

export default function AccountPg() {
  const user = useContext(UserContext);
  const [bookmarks, setBookmarks] = useBookmarks(user);
  const [addedPosts, setAddedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalBookmarkedPosts, setTotalBookmarkedPosts] = useState(0);
  const [totalAddedPosts, setTotalAddedPosts] = useState(0);
  const [bookmarkedPage, setBookmarkedPage] = useState(1);
  const [addedPage, setAddedPage] = useState(1);
  const limit = 5;
  console.log('Component rendered');
  const handleBookmarkedPageChange = (newPage) => {
    setBookmarkedPage(newPage);
  };

  const handleAddedPageChange = (newPage) => {
    setAddedPage(newPage);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${SV_URL}/getPosts`, { params: { ids: JSON.stringify(bookmarks), email: user.email, bookmarkedPage, addedPage, limit } });
        setPosts(response.data.bookmarkedPosts || []);
        setAddedPosts(response.data.addedPosts || []);
        setTotalBookmarkedPosts(response.data.totalBookmarkedPosts || 0);
        setTotalAddedPosts(response.data.totalAddedPosts || 0);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, [bookmarks, user.email, bookmarkedPage, addedPage]);

  return (
    <div className="container px-10 mt-20">
      <MaterialComponent component="Typography" variant="h1" color="white">Account</MaterialComponent>
      <div className="grid grid-cols-1 gap-40 mt-10">

        <div className="gap-10 ">
          <div className="grid grid-cols-1 gap-10">
            <MaterialComponent component="Typography" variant="h3" textGradient color="green">Bookmarks</MaterialComponent>
            {posts.map((post) => (
                         <PostCard
                         key={post.id}
                         post={post}
                         handleBookmarkClick={() => handleBookmarkClick({postId: post.id, bookmarks, setBookmarks, user})}
                         handleRedirect={handleRedirect}
                       />
            ))}
          </div>
          <SimplePagination
        active={bookmarkedPage}
        next={() => handleBookmarkedPageChange(bookmarkedPage + 1)}
        prev={() => handleBookmarkedPageChange(bookmarkedPage - 1)}
        totalPages={Math.ceil(totalBookmarkedPosts / limit)}
      />
        </div>

        <div>
          <div className="grid grid-cols-1 gap-10 ">
            <div className="flex flex-row justify-between">
              <MaterialComponent component="Typography" variant="h3" textGradient color="green">Uploads</MaterialComponent>
              <div className="flex flex-row gap-8">
                <MaterialComponent component="Typography" variant="small" className="flex flex-row items-center">
                  <MaterialComponent component="Checkbox" color="green" className="h-4 w-4 rounded-full" />
                  Select All
                </MaterialComponent>
                <MaterialComponent component="Tooltip" content="Upload">
                  <MaterialComponent component="IconButton" color="gray" variant="gradient" className="rounded-full">
                    <Icon icon="FolderPlusIcon" className="h-5 w-5" strokeWidth={1} />
                  </MaterialComponent>
                </MaterialComponent>
                <MaterialComponent component="Tooltip" content="Remove">
                  <MaterialComponent component="IconButton" color="red" variant="gradient" className="rounded-full">
                    <Icon icon="FolderMinusIcon" className="h-5 w-5" strokeWidth={1} />
                  </MaterialComponent>
                </MaterialComponent>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
            {addedPosts.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      handleBookmarkClick={() => handleBookmarkClick({postId: post.id, bookmarks, setBookmarks, user})}
      handleRedirect={handleRedirect}
    />
  ))}

            </div>
            <SimplePagination
        active={addedPage}
        next={() => handleAddedPageChange(addedPage + 1)}
        prev={() => handleAddedPageChange(addedPage - 1)}
        totalPages={Math.ceil(totalAddedPosts / limit)}
      />
          </div>
        </div>
      </div>
    </div>
  );
}