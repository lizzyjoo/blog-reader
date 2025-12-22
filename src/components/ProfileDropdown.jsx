import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { Link } from "react-router-dom";
import "../styles/profileDropdown.css";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="popup">
      <img
        src={userIcon}
        alt="profile"
        className="header-right-icon"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <nav className={`popup-window ${isOpen ? "open" : ""}`}>
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
            <li>
              <button>
                <Link to="/me">
                  <span>Profile</span>
                </Link>
              </button>
            </li>
            <li>
              <button>
                <span>Settings</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleLogout}>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
