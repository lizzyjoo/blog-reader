import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import userIcon from "../assets/user.png";
import "../styles/profileDropdown.css";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();
  console.log("ProfileDropdown isAuthenticated:", isAuthenticated);

  return (
    <div className="popup">
      <img
        src={userIcon}
        alt="profile"
        className="header-right-icon"
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <nav className="popup-window open">
          <ul>
            <li>
              <button>
                <span>My Feed</span>
              </button>
            </li>

            <li>
              <button>
                <span>Saved</span>
              </button>
            </li>

            {isAuthenticated && (
              <li>
                <button onClick={() => navigate("/me")}>
                  <span>Profile</span>
                </button>
              </li>
            )}

            <li>
              <button>
                <span>Settings</span>
              </button>
            </li>

            <li className="divider">
              <hr />
            </li>

            {isAuthenticated ? (
              <li>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <span>Logout</span>
                </button>
              </li>
            ) : (
              <li>
                <button onClick={() => navigate("/login")}>
                  <span>Login</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
