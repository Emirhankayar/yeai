import { useContext, useEffect, useState, useCallback } from "react";
import MaterialComponent from "../common/Material";
import { BookmarkContext } from "../services/BookmarkContext";
import axios from "axios";
import { SV_URL } from "../utils/utils";
import { useAuth } from "../services/AuthContext";
import PostsSection from "../common/PostsSection";
import { ButtonGroup, Button } from "@material-tailwind/react";

export default function AccountPg() {
  const { user } = useAuth();
  const { bookmarks } = useContext(BookmarkContext);
  const [addedPosts, setAddedPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [bookmarkedPage, setBookmarkedPage] = useState(1);
  const [bookmarkedTotalPages, setBookmarkedTotalPages] = useState(1);
  const [addedPage, setAddedPage] = useState(1);
  const [addedTotalPages, setAddedTotalPages] = useState(1);
  //const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("bookmarks"); // 'bookmarks' or 'promotions'

  const fetchPosts = useCallback(() => {
    if (user) {
      const source = axios.CancelToken.source();
  
      if (activeTab === "added") {
        axios
          .get(`${SV_URL}/added-posts/${user.id}?page=${addedPage}`, { cancelToken: source.token })
          .then((response) => {
            const data = response.data;
            if (Array.isArray(data.addedPosts)) {
              setAddedPosts(data.addedPosts);
              setAddedTotalPages(data.totalPages);
            }
          })
          .catch((error) => {
            if (axios.isCancel(error)) {
              console.log('Request canceled', error.message);
            } else {
              console.error("Error fetching added posts:", error);
            }
          });
      } else {
        const bookmarksString = bookmarks.join(",");
        axios
          .get(`${SV_URL}/bookmarked-posts/${bookmarksString}?page=${bookmarkedPage}`, { cancelToken: source.token })
          .then((response) => {
            const data = response.data;
            if (Array.isArray(data.bookmarkedPosts)) {
              setBookmarkedPosts(data.bookmarkedPosts);
              setBookmarkedTotalPages(data.totalPages);
            }
          })
          .catch((error) => {
            if (axios.isCancel(error)) {
              console.log('Request canceled', error.message);
            } else {
              console.error("Error fetching bookmarked posts:", error);
            }
          });
      }
  
      return () => {
        source.cancel('Operation canceled by the user.');
      }
    }
  }, [user, addedPage, bookmarkedPage, bookmarks, activeTab]);
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="container px-10 place-content-center grid mt-20">
      <MaterialComponent component="Typography" variant="h1" color="white">
        Account
      </MaterialComponent>
      <div className="grid grid-cols-1 gap-20 mt-10">
        <ButtonGroup variant="text">
          <Button
            className={`rounded-none ${
              activeTab === "bookmarks" ? "active" : ""
            }`}
            onClick={() => setActiveTab("bookmarks")}
          >
            Bookmarks
          </Button>
          <Button
            className={`rounded-none ${activeTab === "added" ? "active" : ""}`}
            onClick={() => setActiveTab("added")}
          >
            Promotions
          </Button>
        </ButtonGroup>


          <MaterialComponent
            component="Typography"
            variant="h3"
            textGradient
            color="green"
          >
            {activeTab === "bookmarks" ? "Bookmarks" : "Promotions"}
          </MaterialComponent>
          <div className="grid place-content-center w-full">
            {activeTab === "bookmarks" && (
              <PostsSection
                posts={bookmarkedPosts}
                totalPages={bookmarkedTotalPages}
                currentPage={bookmarkedPage}
                setPage={setBookmarkedPage}
              />
            )}

            {activeTab === "added" && (
              <PostsSection
                posts={addedPosts}
                totalPages={addedTotalPages}
                currentPage={addedPage}
                setPage={setAddedPage}
              />
            )}
          </div>
        </div>

    </div>
  );
}
