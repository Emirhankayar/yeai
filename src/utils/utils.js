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
      console.log('Retrieved data from Supabase:', tools);
      return tools; // Return the retrieved data
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

const retrievePost = async (postTitle, categoryName) => {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('post_title', postTitle)
      .eq('post_category', categoryName);

    if (error) {
      console.error('Error retrieving data:', error);
    } else {
      console.log('Retrieved data from Supabase:', data);
      return data;
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

  export { fetchData, retrieveDataFromSupabase, truncateDescription };
  