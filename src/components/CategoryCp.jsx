import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";

import { useAuth } from "../services/AuthContext";
import { BookmarkContext } from "../services/BookmarkContext";

import { formatCategoryName } from "../utils/categoryUtils";
import { handleRedirect } from "../utils/redirectUtils";
import Breadcrumb from "../common/BreadCrumbs";
import MaterialComponent from "../common/Material";
import { PostCard } from "../common/Card";
import DropdownComponent from "../common/Dropdown";
import { SimplePagination } from "../common/Pagination";
import { CategoryCard } from "../common/CardCategory";
import SearchBar from "../common/SearchBar";
import PgTitle from "../common/Title";
import FilterTag from "../common/FilterTag";
import LoadingPosts from "../common/LoadingPosts";
import useCategories from "../hooks/useCategories";
import { Helmet } from "react-helmet";
import AdSenseComponent from "./Adsense";

import { SV_URL } from "../utils/utils";

const CategoryList = () => {
  const { categories, isLoading: categoriesLoading } = useCategories('categories');
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dataLength, setDataLength] = useState(0);
  const user = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); // New state variable for the current page
  const [totalPosts, setTotalPosts] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState({ field: "", order: "" });

  const { bookmarks, setBookmarks, handleBookmarkClick } =
    useContext(BookmarkContext);
  const filterOptions = [
    { label: "Free" },
    { label: "Freemium" },
    { label: "Free Trial" },
    { label: "Paid" },
  ];
  const orderOptions = [
    { label: "A-Z" },
    { label: "Z-A" },
    { label: "More Popular" },
    { label: "Less Popular" },
    { label: "Newest" },
    { label: "Oldest" },
  ];
  const orderFieldMapping = {
    "A-Z": { field: "post_title", order: "asc" },
    "Z-A": { field: "post_title", order: "desc" },
    "More Popular": { field: "post_view", order: "desc" },
    "Less Popular": { field: "post_view", order: "asc" },
    Newest: { field: "post_added", order: "desc" },
    Oldest: { field: "post_added", order: "asc" },
  };

  const fetchPosts = async () => {
    const params = new URLSearchParams(location.search);
    let category = params.get("category");
    const page = params.get("page") || 1;
    if (!category) {
      category = "";
    }

    setSelectedCategory(category);
    setPage(parseInt(page));

    const response = await axios.get(
      `${SV_URL}/postsByCategory?categoryName=${category}&offset=${
        page - 1
      }&limit=9&searchTerm=${searchTerm}&sortBy=${
        selectedOrder.field
      }&sortOrder=${
        selectedOrder.order === "asc" ? "asc" : "desc"
      }&filterBy=${selectedFilter}`
    );
    return response.data;
  };

  const {
    isLoading: postsLoading,
    isFetching,
    error,
  } = useQuery(
    [
      "posts",
      selectedCategory,
      page,
      searchTerm,
      selectedOrder,
      selectedFilter,
    ],
    fetchPosts,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      //staleTime: 1000 * 60 * 5, // data stays fresh for 5 minutes
      //cacheTime: 1000 * 60 * 30, // data stays in cache for 30 minutes
      onSuccess: (data) => {
        setDataLength(data.posts.length);
        setCategoryPosts(data.posts);
        setTotalPosts(data.totalPosts);
      },
    }
  );

  const totalPages = Math.ceil(totalPosts / 12);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(
      `${location.pathname}?category=${selectedCategory}&page=${newPage}`
    );
  };

  if (error) return "An error has occurred: " + error.message;

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPage(1);
    navigate(`${location.pathname}?category=${category}`);
  };

  const handleSearch = () => {
    setSearchTerm(inputValue);
    if (inputValue) {
      navigate(
        `${location.pathname}?category=${selectedCategory}&search=${inputValue}`
      );
    }
  };

  if (categoriesLoading) return <div></div>;
  const handleRefresh = () => {
    setSearchTerm("");
    setInputValue("");
    setSelectedCategory("");
    navigate(`${location.pathname}?category=${selectedCategory}`);
  };

  const handleFilterChange = (filterOption) => {
    if (filterOption) {
      setSelectedFilter(filterOption);
    } else {
      setSelectedFilter("");
    }
  };

  const handleOrderChange = (orderOption) => {
    if (orderOption) {
      let order;
      let sortOrder;
      switch (orderOption) {
        case "A-Z":
          order = "post_title";
          sortOrder = "asc";
          break;
        case "Z-A":
          order = "post_title";
          sortOrder = "desc";
          break;
        case "More Popular":
          order = "post_view";
          sortOrder = "desc";
          break;
        case "Less Popular":
          order = "post_view";
          sortOrder = "asc";
          break;
        case "Newest":
          order = "post_added";
          sortOrder = "desc";
          break;
        case "Oldest":
          order = "post_added";
          sortOrder = "asc";
          break;
        default:
          order = "";
          sortOrder = "";
      }
      setSelectedOrder({ field: order, order: sortOrder });
    } else {
      setSelectedOrder({ field: "", order: "" });
    }
  };
  const selectedOrderLabel = Object.keys(orderFieldMapping).find(
    (key) =>
      orderFieldMapping[key].field === selectedOrder.field &&
      orderFieldMapping[key].order === selectedOrder.order
  );
  let formattedCategoryName = "";
  if (selectedCategory !== null) {
    formattedCategoryName = formatCategoryName(selectedCategory);
  }

  return (
    <div className="container mx-auto px-10 lg:px-0 max-w-3xl">
      <Helmet>
        <title>{`Tools - ${formattedCategoryName || "Trending"}`}</title>
        <meta
          name="description"
          content={`Posts in category: ${formattedCategoryName || "Trending"}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="duckduckbot" content="index, follow" />
        <meta name="baiduspider" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta
          name="keywords"
          content={`tools, ${formattedCategoryName}, posts`}
        />
        <link
          rel="canonical"
          href={`https://yeai.tech${location.pathname}${location.search}`}
        />

        <meta
          property="og:title"
          content={`Tools - ${formattedCategoryName || "Trending"}`}
        />
        <meta
          property="og:description"
          content={`Posts in category: ${selectedCategory || "Trending"}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://yeai.tech${location.pathname}`}
        />
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6235278469584977"
     crossOrigin="anonymous"></script>
      </Helmet>
      <div className="flex flex-row items-center justify-start mb-10">
        <PgTitle
          text={
            selectedCategory
              ? `Posts in ${formattedCategoryName}`
              : "Trending Tools"
          }
        />
      </div>
      <div className="mb-10">
        <Breadcrumb />
      </div>
      <div className="flex flex-col lg:flex-row md:flex-row gap-5 mb-10">
        <MaterialComponent component="Typography" color="white">
          Total Results: {totalPosts}
        </MaterialComponent>
        <div className="flex gap-2">
          {selectedFilter && (
            <FilterTag
              filterName="Filtered by"
              displayValue={selectedFilter}
              onClear={() => handleFilterChange(null)} // Clear the filter when the tag is removed
            />
          )}
          {selectedOrder.field && (
            <FilterTag
              filterName="Sorted by"
              displayValue={
                orderOptions.find(
                  (option) =>
                    orderFieldMapping[option.label].field ===
                      selectedOrder.field &&
                    orderFieldMapping[option.label].order ===
                      selectedOrder.order
                ).label
              }
              onClear={() => handleOrderChange(null)} // Clear the order when the tag is removed
            />
          )}
          {selectedCategory && (
            <FilterTag
              filterName="Category"
              displayValue={formattedCategoryName}
              onClear={() => handleCategoryClick("")}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 w-full mb-20 place-items-center">
        <CategoryCard
          categories={categories}
          handleCategoryClick={handleCategoryClick}
          handleRefresh={handleRefresh}
          selectedCategory={selectedCategory}
          formattedCategoryName={formattedCategoryName}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 w-full place-content-center gap-10">
          <DropdownComponent
            label="Filter By"
            options={filterOptions}
            selectedOption={selectedFilter}
            onChange={handleFilterChange}
            isOptionDisabled={(option) => selectedFilter === option.label}
            value={selectedFilter}
          />

          <DropdownComponent
            label="Sort By"
            options={orderOptions}
            onChange={handleOrderChange}
            isOptionDisabled={(option) =>
              selectedOrder.field === orderFieldMapping[option.label].field &&
              selectedOrder.order === orderFieldMapping[option.label].order
            }
            value={selectedOrderLabel} // Pass the label instead of the object
          />
        </div>

        <SearchBar
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          handleSearch={handleSearch}
          handleRefresh={handleRefresh}
          searchTerm={searchTerm}
        />
      </div>

      <div className="my-10 w-full flex items-center flex-col justify-center">
        <SimplePagination
          active={page}
          next={() => handlePageChange(page + 1)}
          prev={() => handlePageChange(page - 1)}
          totalPages={totalPages}
        />
      </div>

      {postsLoading || isFetching ? (
        <div className="container gap-10 grid grid-cols-1">
          <LoadingPosts count={9 || dataLength} />
        </div>
      ) : categoryPosts.length > 0 ? (
        <ul className="gap-10 grid grid-cols-1 overflow-x-hidden place-items-center">
          {categoryPosts &&
            categoryPosts.map((post, index) => (
              <>
                {index === 9 && (
                  <AdSenseComponent
                    adClient="client=ca-pub-6235278469584977"
                    adSlot="f08c47fec0942fa0"
                    adFormat="fluid"
                    adLayoutKey="-gw-3+1f-3d+2z"
                  />
                )}
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
              </>
            ))}
        </ul>
      ) : (
        <MaterialComponent
          component="Typography"
          variant="h4"
          color="red"
          textGradient
          className="text-center min-h-screen flex-col gap-5 flex"
        >
          No Search results found. <span>Try something else.</span>
          {searchTerm && (
            <MaterialComponent
              component="Button"
              className="w-1/6 place-self-center mt-5"
              onClick={handleRefresh}
            >
              Refresh
            </MaterialComponent>
          )}
        </MaterialComponent>
      )}
      <div className="mt-10 w-full flex items-center flex-col justify-center">
        <SimplePagination
          active={page}
          next={() => handlePageChange(page + 1)}
          prev={() => handlePageChange(page - 1)}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default CategoryList;
