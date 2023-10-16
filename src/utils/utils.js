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

const retrieveRelatedPosts = async (tags, categoryName) => {
  try {
    let { data: tools, error } = await supabase
      .from('tools')
      .select('*');

    if (tags && tags.length > 0) {
      if (categoryName === 'open-source') {
        tools = tools.filter(tool => tags.includes(tool.post_price));
      } else {
        tools = tools.filter(tool => tags.some(tag => tool.post_category.includes(tag)));
      }
    }

    // Limit the number of retrieved items to 3
    if (tags.length === 2) {
      tools = tools.slice(0, 3);
    } else if (tags.length > 3) {
      const randomTags = tags.sort(() => 0.5 - Math.random()).slice(0, 3);
      let filteredData = [];
      for (const tag of randomTags) {
        const tagData = tools.filter(tool => tool.post_category.includes(tag));
        if (tagData.length > 0) {
          filteredData.push(tagData[0]);
        }
      }
      tools = filteredData;
    } else if (tags.length === 3) {
      tools = tools.slice(0, 1);
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


const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
};

  export { fetchData, retrieveDataFromSupabase, truncateDescription, retrieveRelatedPosts };
  