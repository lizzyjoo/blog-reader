import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../api/api";
import ProfilePostCard from "./ProfilePostCard";
import "../styles/profile.css";

export default function UserProfile() {
  const { id } = useParams();
  // if no id in the url, we are viewing our own profile
  const isOwnProfile = !id;
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (isOwnProfile) {
        const userData = await getCurrentUser();
        setUser(userData);
      } else {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        console.log("huhguhgh", response);
        const userData = await response.json();
        console.log("USERDATA", userData);
        setUser(userData);
      }
    }
    fetchUser();
  }, [id, isOwnProfile]);

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
