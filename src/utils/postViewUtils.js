import { SV_URL } from "./utils";
import axios from "axios";

export default async function updatePostView(post) {
  // Use post.post_id if post.id is not available
  const postId = post.id || post.post_id;

  try {
    const response = await axios.put(`${SV_URL}/updatePostView`, {
      postId: postId,
      post_view: post.post_view,
    });

    if (response.status === 200) {
      // Post view updated successfully
    }
  } catch (error) {
    console.error("Error updating post view:", error);
  }
}