// utils.js

const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_DB_KEY;
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseKey);

const retrieveDataFromSupabase = async (categoryName) => {
  try {
    let { data: tools, error } = await supabase
      .from('tools')
      .select('*')
      .eq('post_category', categoryName);

    if (error) {
      console.error('Error retrieving data:', error);
    } else {
      console.log('Retrieved data from Supabase:', tools);
      return tools;
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

const retrieveCategoriesFromSupabase = async () => {
  try {
    const { data: tools, error } = await supabase.from('tools').select('post_category');

    if (error) {
      console.error('Error retrieving data:', error);
      return [];
    } else {
      const categories = tools.map((tool) => tool.post_category);
      const uniqueCategories = [...new Set(categories)]; // Get unique categories
      const sortedCategories = uniqueCategories.sort(); // Sort the categories alphabetically
      return sortedCategories;
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    return [];
  }
};


const fetchPostsByCategory = async (categoryName) => {
  try {
    const { data: posts, error } = await supabase
      .from('tools')
      .select('*')
      .eq('post_category', categoryName)
      .order('post_view', { ascending: false }); // Sort posts by post_view in descending order

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    } else {
      return posts;
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

const fetchPostById = async (postId) => {
  try {
    const { data: post, error } = await supabase
      .from('tools')
      .select('*')
      .eq('id', postId)
      .single();

    if (error) {
      throw new Error(error);
    }

    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// utils.js
const fetchPopularPosts = async (categoryName, limit = 4) => {
  try {
    const { data: popularPosts, error } = await supabase
      .from('tools')
      .select('*')
      .eq('post_category', categoryName)
      .order('post_view', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error retrieving popular posts:', error);
      return [];
    } else {
      return popularPosts;
    }
  } catch (error) {
    console.error('Error retrieving popular posts:', error);
    return [];
  }
};


// TODO 
const updatePostView = async (postId, post_view) => {
  try {
    const updatedView = (post_view || 0) + 1;
    console.log('postId:', postId);
    console.log('post_view:', post_view);
    console.log('updatedView:', updatedView);
    
    const { data, error } = await supabase
      .from('tools')
      .update({ post_view: updatedView })
      .eq('id', postId);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error updating post view:', error);
  }
};


const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
};

  export { truncateDescription, updatePostView, retrieveCategoriesFromSupabase, fetchPostsByCategory, fetchPostById, fetchPopularPosts };
  