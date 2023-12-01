import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { SV_URL } from "../utils/utils";
import { useAuth } from "../services/AuthContext";
import PostsSection from "../common/PostsSection";
import { ButtonGroup, Button } from "@material-tailwind/react";
import PgTitle from "../common/Title";
import MaterialComponent from "../common/Material";
export default function AccountPg() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("bookmarks");
  const [currentPage, setCurrentPage] = useState(1);


  const fetchPosts = useCallback(
    async ({ queryKey }) => {
      const [, activeTab, user, page] = queryKey;
      if (user) {
        let url = "";
        if (activeTab === "added") {
          url = `${SV_URL}/added-posts/${user.id}?page=${page}`;
        } else if (activeTab === "bookmarks") {
          url = `${SV_URL}/bookmarked-posts/${user.id}?page=${page}`;
        }
        if (url) {
          const response = await axios.get(url);
          const data = response.data;
          return {
            posts: data.addedPosts || data.bookmarkedPosts,
            totalPages: data.totalPages,
            totalPosts: data.totalPosts,
          };
        }
      }
      return { posts: [], totalPages: 0, totalPosts: 0 };
    },
    [user, activeTab]
  );

  const { data: addedPostsData, isLoading: addedPostsLoading } = useQuery(
    ["posts", "added", user, currentPage],
    fetchPosts,
    {
      enabled: activeTab === "added",
      keepPreviousData: true, // keep old data until new data is fetched
    }
  );

  const { data: bookmarkedPostsData, isLoading: bookmarkedPostsLoading } =
    useQuery(["posts", "bookmarks", user, currentPage], fetchPosts, {
      enabled: activeTab === "bookmarks",
      keepPreviousData: true, // keep old data until new data is fetched
    });

  return (
    <div className="container mx-auto px-10 lg:px-0 max-w-3xl">
      <div className="flex flex-row items-center justify-start mb-10">
        <PgTitle text="Account" />
      </div>
      <p>
        Total posts:{" "}
        {activeTab === "bookmarks"
          ? bookmarkedPostsData?.totalPosts
          : addedPostsData?.totalPosts}
      </p>
      <div className="flex flex-col lg:flex-row md:flex-row gap-5 mb-10 mt-10">
        <ButtonGroup variant="text">
          <Button
            className={`rounded-none text-white transition-colors duration-500 capitalize ${
              activeTab === "bookmarks" ? "!bg-emerald-900" : ""
            }`}
            onClick={() => setActiveTab("bookmarks")}
          >
            Bookmarks
          </Button>
          <Button
            className={`rounded-none text-white transition-colors duration-500 capitalize ${
              activeTab === "added" ? "!bg-emerald-900" : ""
            }`}
            onClick={() => setActiveTab("added")}
          >
            Promotions
          </Button>
        </ButtonGroup>
      </div>
      <div className="grid  mt-20">
        {activeTab === "bookmarks" &&
          bookmarkedPostsData?.posts &&
          (bookmarkedPostsData.posts.length > 0 ? (
            <PostsSection
              posts={bookmarkedPostsData.posts}
              totalPages={bookmarkedPostsData.totalPages}
              currentPage={currentPage}
              setPage={setCurrentPage}
              isLoading={bookmarkedPostsLoading}
            />
          ) : (
            <MaterialComponent
              component="Typography"
              variant="h4"
              color="red"
              textGradient
              className="text-center min-h-screen flex-col gap-5 flex"
            >
              No posts in this area yet.
              <a href="/tools">
                <MaterialComponent
                  component="Button"
                  className="place-self-center mt-5"
                >
                  Explore
                </MaterialComponent>
              </a>
            </MaterialComponent>
          ))}

        {activeTab === "added" &&
          addedPostsData?.posts &&
          (addedPostsData.posts.length > 0 ? (
            <PostsSection
              posts={addedPostsData.posts}
              totalPages={addedPostsData.totalPages}
              currentPage={currentPage}
              setPage={setCurrentPage}
              isLoading={addedPostsLoading}
            />
          ) : (
            <MaterialComponent
              component="Typography"
              variant="h4"
              color="red"
              textGradient
              className="text-center min-h-screen flex-col gap-5 flex"
            >
              No posts in this area yet.
              <a href="/promote">
                <MaterialComponent
                  component="Button"
                  className="place-self-center mt-5"
                >
                  Promote
                </MaterialComponent>
              </a>
            </MaterialComponent>
          ))}
      </div>
    </div>
  );
}
