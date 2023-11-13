import axios from 'axios';
import { SV_URL } from "./utils";
export const handleBookmarkClick = async ({
  postId,
  bookmarks,
  setBookmarks,
  user,
}) => {
  // If there's no user, do nothing
  if (!user) {
    return;
  }

  const userEmail = user.email;
  const postIdString = String(postId);

  const isBookmarked = bookmarks.includes(postIdString);
  const endpoint = "/toggleBookmark";
  const method = "put";

  try {
    const response = await axios({
      method,
      url: `${SV_URL}${endpoint}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { userEmail, postId: postIdString },
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    // Update the state only after the network request is successful
    if (isBookmarked) {
      setBookmarks((prevBookmarks) => prevBookmarks.filter((id) => id !== postIdString));
    } else {
      setBookmarks((prevBookmarks) => [...prevBookmarks, postIdString]);
    }
  } catch (error) {
    console.error("Error updating bookmark:", error);
  }
};