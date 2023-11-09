import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PgTitle, SkeletonPost } from '../common/Skeleton';
import { CategoryCard, SearchBar, PostCard, SimplePagination } from '../common/Card';
import MaterialComponent from '../common/Material';
import { handleRedirect } from '../utils/utils';
import { UserContext } from '../services/UserContext';
import { BookmarkContext } from '../services/BookmarkContext';
import { useLocation } from 'react-router-dom';
import { CategoryContext } from "../services/CategoryContext";
import DropdownComponent from '../common/Dropdown';

const SV_URL = 'http://localhost:10000';


const CategoryList = () => {
  const categories = useContext(CategoryContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dataLength, setDataLength] = useState(0);
  const user = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); // New state variable for the current page
  const [totalPosts, setTotalPosts] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState({ field: '', order: '' });
  const { bookmarks, setBookmarks, handleBookmarkClick } = useContext(BookmarkContext);
  const filterOptions = [
    { label: 'Free' },
    { label: 'Freemium' },
    { label: 'Free Trial' },
    { label: 'Paid' },
  ];
  const orderOptions = [
    { label: 'A-Z' },
    { label: 'Z-A' },
    { label: 'More Popular' },
    { label: 'Less Popular' },
    { label: 'Newest' },
    { label: 'Oldest' },
  ];
  const orderFieldMapping = {
    'A-Z': { field: 'post_title', order: 'asc' },
    'Z-A': { field: 'post_title', order: 'desc' },
    'More Popular': { field: 'post_view', order: 'desc' },
    'Less Popular': { field: 'post_view', order: 'asc' },
    'Newest': { field: 'post_added', order: 'desc' },
    'Oldest': { field: 'post_added', order: 'asc' },
  };

  

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let category = params.get('category');
    const page = params.get('page') || 1; // Get the page number from the URL
    if (!category) {
      category = '';
    }
    // Update the selectedCategory state
    setSelectedCategory(category);
    setPage(parseInt(page)); // Update the page state
  
    setIsLoading(true);
    axios
      .get(`${SV_URL}/postsByCategory?categoryName=${category}&offset=${page - 1}&limit=9&searchTerm=${searchTerm}&sortBy=${selectedOrder.field}&sortOrder=${selectedOrder.order === 'asc' ? 'asc' : 'desc'}&filterBy=${selectedFilter}`)
      .then((res) => {
        setCategoryPosts(res.data.posts);
        setTotalPosts(res.data.totalPosts);
        setDataLength(res.data.posts.length);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [location.search, searchTerm, selectedOrder, selectedFilter]);
  
  const totalPages = Math.ceil(totalPosts / 12);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`${location.pathname}?category=${selectedCategory}&page=${newPage}`);
  };

  const handleCategoryClick = (category) => {
    // Update the state
    setSelectedCategory(category);
      // Reset the page state back to 1
    setPage(1);
    setSelectedOrder({ field: '', order: '' }); // reset the selected order
    setSelectedFilter(''); // reset the selected filter
    // Update the URL without causing a page refresh
    navigate(`${location.pathname}?category=${category}`);
  };
  
  const handleSearch = () => {
    setSearchTerm(inputValue);
    // Update the URL without causing a page refresh
    if (inputValue) {
      navigate(`${location.pathname}?category=${selectedCategory}&search=${inputValue}`);
    }
  };
  
  const handleRefresh = () => {
    setSearchTerm('');
    setInputValue('');
    //navigate(`${location.pathname}?category=${selectedCategory}`);
  };
  


  const renderLoadingPosts = Array.from({ length: dataLength }).map((_, index) => (
    <SkeletonPost key={index} />
  ));

  if (isLoading) {
    return (
      <div className="container px-10 grid grid-cols-1 gap-10 mt-40">
        {renderLoadingPosts}
      </div>
    );
  }
  const handleFilterChange = (filterOption) => {
    setSelectedFilter(filterOption);
  };
  
const handleOrderChange = (orderOption) => {
  let order;
  let sortOrder;
  switch (orderOption) {
    case 'A-Z':
      order = 'post_title';
      sortOrder = 'asc';
      break;
    case 'Z-A':
      order = 'post_title';
      sortOrder = 'desc';
      break;
    case 'More Popular':
      order = 'post_view';
      sortOrder = 'desc';
      break;
    case 'Less Popular':
      order = 'post_view';
      sortOrder = 'asc';
      break;
    case 'Newest':
      order = 'post_added';
      sortOrder = 'desc';
      break;
    case 'Oldest':
      order = 'post_added';
      sortOrder = 'asc';
      break;
    default:
      order = '';
      sortOrder = '';
  }
  setSelectedOrder({ field: order, order: sortOrder });
};

const formatCategoryName = (category) => {
  return `${category.split('-').map(word => {
    if (word === 'and') return word.toLowerCase();
    if (word === 'ai') return word.toUpperCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ')}`;
};

  return (
    <div className="container mx-auto px-10">
      <div className='flex flex-row items-center justify-between mb-10'>
      <PgTitle text={selectedCategory ? `Posts in ${formatCategoryName(selectedCategory)}` : 'Trending Tools'} />      
      </div>
      <div className='flex flex-col lg:flex-row md:flex-row gap-5 mb-10'>
      <p>Total Results: {totalPosts}</p>
      <p>Total pages: {totalPages}</p>
      <div className='flex gap-2'>
  {selectedFilter && (
    <div className='flex items-center gap-2'>
      <span>Filtered by: {selectedFilter}</span>
      <button onClick={() => setSelectedFilter('')}>x</button>
    </div>
  )}
  {selectedOrder.field && (
    <div className='flex items-center gap-2'>
      <span>Sorted by: {orderOptions.find(option => orderFieldMapping[option.label].field === selectedOrder.field && orderFieldMapping[option.label].order === selectedOrder.order).label}</span>
      <button onClick={() => setSelectedOrder({ field: '', order: '' })}>x</button>
    </div>
  )}
  {selectedCategory && (
  <div className='flex items-center gap-2'>
  <span>Category: {formatCategoryName(selectedCategory)}</span>
  <button onClick={() => handleCategoryClick('')}>x</button>
</div>
)}
</div>
      </div>
      <div className='flex flex-col md:flex-row lg:flex-row gap-10 max-w-lg mb-20'>
          <MaterialComponent component="Select"  
          label="Select Category"
          labelProps={{ className: "text-white" }}
          menuProps={{ className: "bg-gray-200" }}
          size="md"
          containerProps={{ className: "min-w-[50px]" }}>
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  category={category}
                  handleCategoryClick={handleCategoryClick}
                />
              ))}
            </MaterialComponent>
            <SearchBar value={inputValue} onChange={(e) => setInputValue(e.target.value)} />      
            <button onClick={handleSearch}>Search</button>
            {searchTerm && <button onClick={handleRefresh}>Refresh</button>}
             </div>

             <div className='flex flex-col md:flex-row lg:flex-row gap-10 max-w-lg mb-20'>

             <DropdownComponent
  label="Filter By"
  options={filterOptions}
  selectedOption={selectedFilter}
  onChange={handleFilterChange}
  isOptionDisabled={(option) => selectedFilter === option.label}
/>

<DropdownComponent
  label="Sort By"
  options={orderOptions}
  selectedOption={selectedOrder}
  onChange={handleOrderChange}
  isOptionDisabled={(option) => selectedOrder.field === orderFieldMapping[option.label].field && selectedOrder.order === orderFieldMapping[option.label].order}
/>
  </div>

      <>
        <ul className='gap-10 grid grid-cols-1 overflow-x-hidden'>
          {categoryPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              handleBookmarkClick={() => handleBookmarkClick({postId: post.id, bookmarks, setBookmarks, user})}
              handleRedirect={handleRedirect}
            />
          ))}
        </ul>
        <SimplePagination active={page} next={() => handlePageChange(page + 1)} prev={() => handlePageChange(page - 1)} totalPages={totalPages} />
        </>

    </div>
  );
};

export default CategoryList;