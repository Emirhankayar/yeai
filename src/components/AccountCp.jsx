import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { SV_URL } from "../utils/utils";
import { useAuth } from "../services/AuthContext";
import PostsSection from "../common/PostsSection";
import { ButtonGroup, Button } from "@material-tailwind/react";
import PgTitle from "../common/Title";
import MaterialComponent from "../common/Material";
import Breadcrumb from "../common/BreadCrumbs";
import { Helmet } from "react-helmet";

export default function AccountPg() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("bookmarks");
  const [currentPage, setCurrentPage] = useState(1);
  const [addedDataLength, setAddedDataLength] = useState(0);
  const [bookmarkDataLength, setBookmarkDataLength] = useState(0);

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

  const { data: addedPostsData, isLoading: addedPostsLoading, isFetching: addedPostsFetching } = useQuery(
    ["posts", "added", user, currentPage],
    fetchPosts,
    {
      enabled: activeTab === "added",
      keepPreviousData: true, 
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, 
      cacheTime: 1000 * 60 * 30, 
      onSuccess: (data) => {
        setAddedDataLength(data.posts.length);
      }
    }
  );

  const { data: bookmarkedPostsData, isLoading: bookmarkedPostsLoading, isFetching: bookmarkedPostsFetching } =
    useQuery(["posts", "bookmarks", user, currentPage], fetchPosts, {
      enabled: activeTab === "bookmarks",
      keepPreviousData: true, 
      refetchOnWindowFocus: false,
      //staleTime: 1000 * 60 * 5, 
      //cacheTime: 1000 * 60 * 30, 
      onSuccess: (data) => {
        setBookmarkDataLength(data.posts.length);
      }
    });

  return (
    <div className="container mx-auto px-10 lg:px-0 max-w-3xl">
      <Helmet>
        <title>{`Profile`}</title>
        <meta
          name="description"
          content={`Profile page for user`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="duckduckbot" content="index, follow" />
        <meta name="baiduspider" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta
          name="keywords"
          content={`News, AI news, AI, Artificial Intelligence, What's new, Latest news, news, Technology, Artificial Intelligence News, Artificial Intelligence tools, yeai, yeai tech, profile, user`}
        />
        <link
          rel="canonical"
          href={`https://yeai.tech${location.pathname}`}
        />

        <meta
          property="og:title"
          content={`Posts in Profile`}
        />
        <meta
          property="og:description"
          content={`Posts in Profile`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://yeai.tech${location.pathname}`}
        />
      </Helmet>
      <div className="flex flex-row items-center justify-start mb-10">
        <PgTitle text="Profile" />
      </div>
            <div className="mb-10">
        <Breadcrumb />
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
              dataLength={bookmarkDataLength}
              isFetching={bookmarkedPostsFetching}
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
              dataLength={addedDataLength}
              isFetching={addedPostsFetching}
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
