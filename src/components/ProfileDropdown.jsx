import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import userIcon from "../assets/user.png";
import "../styles/profileDropdown.css";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [navigate]);

  return (
    <div className="popup" ref={dropdownRef}>
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
              <button
                onClick={() => navigate(`/users/${user?.username}/posts`)}
              >
                <span>My Page</span>
              </button>
            </li>

            <li>
              <button onClick={() => navigate(`/saved`)}>
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
              <button onClick={() => navigate("/settings")}>
                <span>Settings</span>
              </button>
            </li>
            {user?.isAdmin && (
              <>
                <div className="dropdown-divider"></div>
                <a
                  href="http://localhost:5174" //
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-link"
                >
                  Admin Dashboard
                </a>
              </>
            )}

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
