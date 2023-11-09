
import { SV_URL } from "./utils";
export const handleBookmarkClick = async ({postId, bookmarks, setBookmarks, user}) => {
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
          //console.log('New bookmarks:', newBookmarks);
          return newBookmarks;
        });
      } else {
        setBookmarks(prevBookmarks => {
          const newBookmarks = [...prevBookmarks, postIdString];
          //console.log('New bookmarks:', newBookmarks);
          return newBookmarks;
        });
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };
  
  