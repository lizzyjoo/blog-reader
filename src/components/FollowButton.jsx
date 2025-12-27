import { useState, useEffect } from "react";
import { followUser, unfollowUser, checkFollowing } from "../api/api";

export default function FollowButton({ username }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function checkStatus() {
      if (!token) {
        setLoading(false);
        return;
      }
      const data = await checkFollowing(username, token);
      setIsFollowing(data.isFollowing);
      setLoading(false);
    }
    checkStatus();
  }, [username, token]);

  async function handleClick() {
    if (!token) {
      alert("Please log in to follow users");
      return;
    }

    setLoading(true);
    if (isFollowing) {
      await unfollowUser(username, token);
      setIsFollowing(false);
    } else {
      await followUser(username, token);
      setIsFollowing(true);
    }
    setLoading(false);
  }

  if (loading) return <button disabled>...</button>;

  return (
    <button
      onClick={handleClick}
      className={isFollowing ? "following" : "follow"}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
