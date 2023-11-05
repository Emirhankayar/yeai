import { useState, useEffect } from 'react';
import axios from "axios";
import Icon from "../common/Icons";
import MaterialComponent from "../common/Material";
import { useSupabaseAuth } from '../utils/utils';
import { useBookmarks } from '../hooks/useBookmarks';

const SV_URL = 'http://localhost:10000';

export function AccountPg() {
  const user = useSupabaseAuth();
  console.log(user)
  const [bookmarks] = useBookmarks(user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (bookmarks.length > 0) {
      axios.get(`${SV_URL}/getBookmarkPosts`, { params: { ids: bookmarks } })
      .then(response => {
        console.log('Posts fetched:', response.data.posts);
        if (response.data.posts) {
          setPosts(response.data.posts);
        } else {
          setPosts([]);
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
    }
  }, [bookmarks]);

  
  return (
    <div className="container px-10 mt-20">
      <MaterialComponent component="Typography" variant="h1" color="white">Account</MaterialComponent>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

        <div className="gap-10 ">
          <div className="grid grid-cols-1 gap-10">
            <MaterialComponent component="Typography" variant="h3" textGradient color="green">Bookmarks</MaterialComponent>
            {posts.map((post, index) => (
              <div key={index}>
                {/* Render the post here */}
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
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
                        <MaterialComponent component="Button" className="rounded-full !bg-none !border-none !shadow-none px-2">Browse Files</MaterialComponent>
                      </MaterialComponent>
                    </div>
                  </div>
                </div>
              </MaterialComponent>

              <MaterialComponent component="Card" color="gray" className="h-36">
                <MaterialComponent component="CardBody">
                  <MaterialComponent component="Checkbox" color="green" className="rounded-full"/>
                </MaterialComponent>
              </MaterialComponent>
              <MaterialComponent component="Card" color="gray" className="h-36">
                <MaterialComponent component="CardBody">
                  <MaterialComponent component="Checkbox" color="green" className="rounded-full"/>
                </MaterialComponent>
              </MaterialComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}