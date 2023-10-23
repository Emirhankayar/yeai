// utils.js

const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_DB_KEY;
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseKey);

const retrieveAllCategoriesFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('distinct_categories')
      .select('*')
      .order('post_category', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    const categories = data.map((item) => item.post_category);
    return categories;
  } catch (error) {
    console.error('Error fetching distinct categories:', error.message);
    return [];
  }
};

const retrieveCategoriesFromSupabase = async (page, pageSize, searchInput) => {
  const offset = (page - 1) * pageSize;
  let { data, error } = await supabase
    .from('distinct_categories')
    .select('post_category')
    .order('post_category', { ascending: true })
    .range(offset, offset + pageSize - 1);

  if (searchInput) {
    const searchTerm = `%${searchInput}%`;
    ({ data, error } = await supabase
      .from('distinct_categories')
      .select('post_category')
      .order('post_category', { ascending: true })
      .range(offset, offset + pageSize - 1)
      .ilike('post_category', searchTerm, { caseSensitive: false }));
  }

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data.map((item) => item.post_category).filter(category => category !== null);
};

const fetchPostsByCategory = async (categoryName, page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    let query = supabase.from('tools').select('*').range(offset, offset + pageSize - 1);

    if (categoryName === 'Freebies') {
      const { data: allPosts, error } = await query.order('post_view', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return [];
      } else {
        const freeItems = allPosts.filter(
          (post) => post.post_price === 'Free' || post.post_price === 'Freemium'
        );
        const otherItems = allPosts.filter(
          (post) => post.post_price !== 'Free' && post.post_price !== 'Freemium'
        );
        const modifiedFreeItems = freeItems.map((item) => ({ ...item, post_category: 'Freebies' }));
        return [...otherItems, ...modifiedFreeItems];
      }
    } else {
      query = query.eq('post_category', categoryName);
      const { data: posts, error } = await query.order('post_view', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return [];
      } else {
        return posts;
      }
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
      .select('*', { headers: { apikey: {supabaseKey} } }) 
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

const fetchPopularPosts = async (categoryName, limit = 4) => {
  try {
    let query = supabase.from('tools').select('*');

    if (categoryName !== 'Freebies') {
      query = query.eq('post_category', categoryName).order('post_view', { ascending: false }).limit(limit);
    } else {
      const { data: freeItems, error: freeItemsError } = await supabase
        .from('tools')
        .select('*')
        .in('post_price', ['Free', 'Freemium'])
        .order('post_view', { ascending: false });

      if (freeItemsError) {
        console.error('Error retrieving popular free items:', freeItemsError);
        return [];
      }

      return freeItems.slice(0, limit);
    }

    const { data: popularPosts, error } = await query;

    if (error) {
      console.error('Error retrieving popular posts:', error);
      return [];
    }

    return popularPosts.slice(0, limit);
  } catch (error) {
    console.error('Error retrieving popular posts:', error);
    return [];
  }
};

const updatePostView = async (postId, post_view) => {
  try {
    const updatedView = (post_view || 0) + 1;
    
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
  if (!description) {
    return '';
  }
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
};

  export 
  { truncateDescription, 
    updatePostView, 
    retrieveCategoriesFromSupabase, 
    fetchPostsByCategory, 
    fetchPostById, 
    fetchPopularPosts,
    supabase,
    retrieveAllCategoriesFromSupabase,
  };
  