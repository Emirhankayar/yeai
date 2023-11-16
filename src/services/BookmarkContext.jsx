// BookmarkContext.js
import { createContext } from "react";
import { useBookmarks } from "../hooks/useBookmarks";
import { useAuth } from "./AuthContext";
import PropTypes from 'prop-types';

import { handleBookmarkClick } from "../utils/bookmarkUtils";

export const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const { user } = useAuth();
  const [bookmarks, setBookmarks, added ] = useBookmarks(user);

  return (
    <BookmarkContext.Provider value={{ bookmarks, setBookmarks, handleBookmarkClick, added }}>
      {children}
    </BookmarkContext.Provider>
  );
}

BookmarkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};