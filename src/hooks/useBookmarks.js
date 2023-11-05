// hooks/useBookmarks.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const SV_URL = import.meta.env.VITE_SV_URL;

export function useBookmarks(user) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`${SV_URL}/getBookmarks`, { params: { email: user.email } })
        .then(response => {
          console.log('Bookmarks fetched:', response.data.bookmarks);
          setBookmarks(response.data.bookmarks);
        })
        .catch(error => {
          console.error('Error fetching bookmarks:', error);
        });
    }
  }, [user]);

  return [bookmarks, setBookmarks];
}