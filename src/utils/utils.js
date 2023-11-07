// utils.js
import { useEffect, useState } from 'react';
const supabaseUrl = import.meta.env.VITE_DB_URL;
const supabaseKey = import.meta.env.VITE_DB_KEY;
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(supabaseUrl, supabaseKey);
const SV_URL = import.meta.env.VITE_SV_URL;

export const useSupabaseAuth = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session ? session.user : null);
      }
    );
    
    // Cleanup the listener
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return user;
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
    const newWindow = window.open(link, '_blank');
    newWindow.focus();
  } catch (error) {
    console.error('Error redirecting:', error);
  }
};

const handleBookmarkClick = async ({postId, bookmarks, setBookmarks, user}) => {
  const userEmail = user.email; // Change this line
  const postIdString = String(postId);

  const isBookmarked = bookmarks.includes(postIdString);
  const endpoint = isBookmarked ? '/removeBookmark' : '/updateBookmark';
  const method = isBookmarked ? 'DELETE' : 'PUT';

  try {
    const response = await fetch(`${SV_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, postId: postIdString }), // Send postId as an array
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    if (isBookmarked) {
      setBookmarks(prevBookmarks => {
        const newBookmarks = prevBookmarks.filter(id => id !== postIdString);
        console.log('New bookmarks:', newBookmarks);
        return newBookmarks;
      });
    } else {
      setBookmarks(prevBookmarks => {
        const newBookmarks = [...prevBookmarks, postIdString];
        console.log('New bookmarks:', newBookmarks);
        return newBookmarks;
      });
    }
  } catch (error) {
    console.error('Error updating bookmark:', error);
  }
};




export {
  truncateDescription,
  supabase,
  handleRedirect,
  handleBookmarkClick,
};
