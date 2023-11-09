import { SV_URL } from "./utils";
import axios from "axios";

export default async function updatePostView(post) {
    try {
      const response = await axios.put(`${SV_URL}/updatePostView`, {
        postId: post.id,
        post_view: post.post_view,
      });
  
      if (response.status === 200) {
        // Post view updated successfully
      }
    } catch (error) {
      console.error('Error updating post view:', error);
    }
  }
