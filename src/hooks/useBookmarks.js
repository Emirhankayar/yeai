// hooks/useBookmarks.js
import { useState, useEffect } from "react";
import axios from "axios";

import { SV_URL } from "../utils/utils";

export function useBookmarks( user ) {
  const [bookmarks, setBookmarks] = useState([]);
  const [added, setAdded] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`${SV_URL}/getBookmarkIds`, { params: { userId: user.id } })
        .then((response) => {
          setBookmarks(response.data.bookmarkedPostIds || []);
          setAdded(response.data.userAddedPostIds || []);
          //console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bookmark IDs:", error);
          console.log(error.response.data);
        });
    }
  }, [user]);

  return [bookmarks, setBookmarks, added, setAdded];
}