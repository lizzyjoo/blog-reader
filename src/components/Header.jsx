// Header.jsx
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import searchIcon from "../assets/search.png";
import addIcon from "../assets/add.png";
import SearchBar from "./SearchBar";
import "../styles/header.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header>
      <div className="header-left">
        <Link to="/">
          <div className="header-logo">URTEXT</div>
        </Link>
      </div>
      <div className="header-center">
        <nav className="header-nav">
          <NavLink to="/" className="header-link">
            Discover
          </NavLink>
          {user && (
            <NavLink to="/?feed=subscribed" className="header-link">
              Subscribed
            </NavLink>
          )}
        </nav>
      </div>
      <div className="header-right">
        <div className="search-container">
          <img src={searchIcon} alt="search" className="header-right-icon" />
          <SearchBar />
        </div>
        <div>
          <Link to="/posts/new">
            <img src={addIcon} alt="add-post" className="header-right-icon" />
          </Link>
        </div>
        <div>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
