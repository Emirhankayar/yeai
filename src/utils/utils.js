// utils.js

const url = import.meta.env.VITE_SV_URL;

const fetchData = (page, setData, setLoading, setError) => {
  fetch(`${url}?page=${page}`) 
  .then((response) => response.json())
  .then((data) => {
    //console.log('Fetched data:', data); 
    setData(data);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error:', error);
    setError('Error fetching data. Please try again later.');
    setLoading(false);
  });
};


// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_DB_KEY;
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseKey);

// Retrieve data from Supabase with specific category names
const retrieveDataFromSupabase = async (tags, categoryName) => {
  try {
    let { data: tools, error } = await supabase
      .from('tools')
      .select('*');

    if (tags && tags.length > 0) {
      if (categoryName === 'open-source') {
        tools = tools.filter(tool => tags.includes(tool.post_price));
      } else {
        tools = tools.filter(tool => tags.includes(tool.post_category));
      }
    }

    if (error) {
      console.error('Error retrieving data:', error);
    } else {
      //console.log('Retrieved data from Supabase:', tools);
      return tools;
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};


const retrieveSinglePostFromSupabase = async (id) => {
  try {
    let { data: posts, error } = await supabase
      .from('tools')
      .select('*')
      .eq('id', id)
      .limit(1);

    if (error) {
      console.error('Error retrieving data:', error);
    } else {
      if (posts.length > 0) {
        //console.log('Retrieved data from Supabase:', posts[0]);
        return posts[0]; 
      } else {
        //console.log('No data found for the specified post ID');
        return null;
      }
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

const retrieveRelatedPosts = async (categoryName, currentPostId) => {
  try {
    let { data: relatedPosts, error } = await supabase
      .from('tools') // Update the table name to 'tools'
      .select('*')
      .eq('post_category', categoryName);

    // Initialize relatedPosts as an empty array if it's null
    relatedPosts = relatedPosts || [];

    // Filter out the current post being displayed
    relatedPosts = relatedPosts.filter(post => post.id !== currentPostId);

    // Remove duplicates from the related posts
    const uniqueRelatedPosts = Array.from(new Set(relatedPosts.map(post => post.id)))
      .map(id => {
        return relatedPosts.find(post => post.id === id);
      });

    // Randomly select 3 unique posts from the related posts
    const randomRelatedPosts = uniqueRelatedPosts
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    if (error) {
      console.error('Error retrieving data:', error);
    } else {
      //console.log('Retrieved data from Supabase:', randomRelatedPosts);
      return randomRelatedPosts; // Return the retrieved data
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};



const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
};

  export { fetchData, retrieveDataFromSupabase, truncateDescription, retrieveRelatedPosts, retrieveSinglePostFromSupabase };
  