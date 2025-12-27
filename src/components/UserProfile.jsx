import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../api/api";
import ProfilePostCard from "./ProfilePostCard";
import SubscriptionPage from "./SubscriptionPage";
import FollowButton from "./FollowButton";
import "../styles/profile.css";

export default function UserProfile() {
  const { username } = useParams();
  // if no id in the url, we are viewing our own profile
  const isOwnProfile = !username;
  const [user, setUser] = useState(null);
  // use state to check which menu is selected: posts (default), subscribed,
  const [activeMenu, setActiveMenu] = useState("posts");
  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
  };
  const renderComponent = () => {
    switch (activeMenu) {
      case "posts":
        return (
          <div>
            {user.posts.map((post) => (
              <ProfilePostCard key={post.id} post={post} />
            ))}
          </div>
        );
      case "subscribed":
        return <SubscriptionPage />;
      default:
        return null;
    }
  };

  useEffect(() => {
    async function fetchUser() {
      if (isOwnProfile) {
        const userData = await getCurrentUser();
        setUser(userData);
      } else {
        const response = await fetch(`http://localhost:3000/users/${username}`);
        const userData = await response.json();
        setUser(userData);
      }
    }
    fetchUser();
  }, [username, isOwnProfile]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1 className="profile-username">@{user.username}</h1>
        {!isOwnProfile && <FollowButton username={user.username} />}
        <div>
          <div>Joined{user.registeredDate}</div>
          <div>Posts{user.posts.length}</div>
          <div>Subscribers{user.registeredDate}</div>
          <button onClick={() => handleMenuClick("posts")}>Posts</button>
          <button onClick={() => handleMenuClick("subscribed")}>
            Subscribed{user.subscribers}
          </button>
        </div>

        <p></p>
      </div>
      <div>
        sort tabs come here, recent, most liked, most commented, most saved,
        most viewed{" "}
      </div>

      <main>{renderComponent()}</main>
    </>
  );
}
