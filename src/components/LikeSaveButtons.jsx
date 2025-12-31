import { useState, useEffect } from "react";
import {
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  getPostStatus,
} from "../api/api";
import { useAuth } from "../context/AuthContext";
import heartEmpty from "../assets/heart.png";
import heartFilled from "../assets/heartFilled.png"; // You'll need this
import bookmarkEmpty from "../assets/bookmark.png"; // You'll need this
import bookmarkFilled from "../assets/bookmarkFilled.png"; // You'll need this

export default function LikeSaveButtons({ postId, initialLikes }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    async function fetchStatus() {
      if (!token) return;
      const status = await getPostStatus(postId, token);
      setIsLiked(status.isLiked);
      setIsSaved(status.isSaved);
    }
    fetchStatus();
  }, [postId, token]);

  async function handleLike() {
    if (!user) {
      alert("Please log in to like posts");
      return;
    }

    if (isLiked) {
      await unlikePost(postId, token);
      setIsLiked(false);
      setLikes(likes - 1);
    } else {
      await likePost(postId, token);
      setIsLiked(true);
      setLikes(likes + 1);
    }
  }

  async function handleSave() {
    if (!user) {
      alert("Please log in to save posts");
      return;
    }

    if (isSaved) {
      await unsavePost(postId, token);
      setIsSaved(false);
    } else {
      await savePost(postId, token);
      setIsSaved(true);
    }
  }

  return (
    <div className="like-save-buttons">
      <button onClick={handleLike} className="like-btn">
        <img src={isLiked ? heartFilled : heartEmpty} alt="like" />
        <span>{likes}</span>
      </button>
      <button onClick={handleSave} className="save-btn">
        <img src={isSaved ? bookmarkFilled : bookmarkEmpty} alt="save" />
      </button>
    </div>
  );
}
