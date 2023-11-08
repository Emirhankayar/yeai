import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useBookmarks } from '../hooks/useBookmarks';
import { UserContext } from '../services/UserContext';
import MaterialComponent from '../common/Material';
import { PostCard } from '../common/Card';
import Icon from '../common/Icons';
import { handleRedirect, handleBookmarkClick } from '../utils/utils';

const SV_URL = import.meta.env.VITE_SV_URL

export default function AccountPg() {
  const user = useContext(UserContext);
  const [bookmarks, setBookmarks] = useBookmarks(user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (bookmarks.length > 0) {
        try {
          const response = await axios.get(`${SV_URL}/getBookmarkPosts`, { params: { ids: JSON.stringify(bookmarks) } });
          setPosts(response.data.posts || []);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };

    fetchPosts();
  }, [bookmarks]);

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
              <MaterialComponent component="Card" color="transparent" className="h-36 border-2 border-dashed border-gray-800 grid-cols-1 place-content-center justify-content-center">
                <div className="flex flex-col items-center space-y-5">
                  <Icon icon="InboxArrowDownIcon" color="gray" className="h-9 w-9 mt-12" />
                  <div className="flex flex-row place-items-center">
                    <div>
                      <MaterialComponent component="Typography" variant="small" className="text-left">
                        Drag the file or
                        <MaterialComponent component="Button" className="rounded-full !bg-none !border-none !shadow-none px-2">Browse Files (coming soon)</MaterialComponent>
                      </MaterialComponent>
                    </div>
                  </div>
                </div>
              </MaterialComponent>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}