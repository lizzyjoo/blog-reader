import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/api";
import ProfilePostCard from "./ProfilePostCard";
import "../styles/profile.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const data = await getCurrentUser();
      setUser(data);
    }
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1 className="profile-username">@{user.username}</h1>
        <div>
          <div>Joined</div>
          <div>Subscribers</div>
          <div>Posts</div>
        </div>

        <p></p>
      </div>

      <div>
        {user.posts.map((post) => (
          <ProfilePostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
