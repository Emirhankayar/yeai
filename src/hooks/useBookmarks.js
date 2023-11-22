// hooks/useBookmarks.js
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { isEqual } from "lodash";

import { SV_URL } from "../utils/utils";

export function useBookmarks(user) {
  const [bookmarks, setBookmarks] = useState([]);
  const [added, setAdded] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevUserRef = useRef();

  useEffect(() => {
    if (!isEqual(user, prevUserRef.current)) {
      prevUserRef.current = user;
      if (user) {
        const source = axios.CancelToken.source();
  
        axios
          .get(`${SV_URL}/getBookmarkIds`, { params: { userId: user.id }, cancelToken: source.token })
          .then((response) => {
            setBookmarks(response.data.bookmarkedPostIds || []);
            setAdded(response.data.userAddedPostIds || []);
            setLoading(false);
          })
          .catch((error) => {
            if (axios.isCancel(error)) {
              console.log('Request canceled', error.message);
            } else {
              console.error("Error fetching bookmark IDs:", error);
              console.log(error.response.data);
            }
          });
  
        return () => {
          source.cancel('Operation canceled by the user.');
        }
      }
    }
  }, [user]);

  return [bookmarks, setBookmarks, added, setAdded, loading];
}