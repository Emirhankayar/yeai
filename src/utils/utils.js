// utils.js
import axios from 'axios';
const SV_URL = import.meta.env.VITE_SV_URL

const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_DB_KEY;
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseKey);

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

const handleRedirect = (link) => {
  try {
    console.log(link)
    const newWindow = window.open(link, '_blank');
    newWindow.focus();
  } catch (error) {
    console.error('Error redirecting:', error);
  }
};

  export 
  { truncateDescription, 
    updatePostView, 
    supabase,
    handleRedirect,
  };
  