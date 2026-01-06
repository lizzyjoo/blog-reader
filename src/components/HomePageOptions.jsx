// HomePageOptions.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";
import infoIcon from "../assets/info.png";
import FollowButton from "./FollowButton";

export default function HomePageOptions({ username }) {
  const { user } = useAuth();
  const isOwnProfile = user?.username === username;

  return (
    <div className="homepage-options">
      <div className="user-info">
        <p>@{username}</p>
        <div className="user-action">
          <Link to={`/users/${username}/profile`} className="info-link">
            <button className="info-btn">
              <img src={infoIcon} alt="info" className="info-icon" />
            </button>
          </Link>
          {!isOwnProfile && <FollowButton username={username} />}
        </div>
      </div>
    </div>
  );
}
