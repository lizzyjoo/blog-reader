import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import searchIcon from "../assets/search.png";
import addIcon from "../assets/add.png";
import SearchBar from "./SearchBar";
import MainPostOptions from "./MainPostOptions";
import HomePageOptions from "./HomePageOptions";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";

const getHeaderVariant = (pathname) => {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/users/")) return "user";
  if (pathname.startsWith("/posts/")) return "post";
  return "default";
};

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const variant = getHeaderVariant(location.pathname);

  const searchContainerRef = useRef(null);
  const { user } = useAuth();

  const showMainPostOptions =
    location.pathname === "/" ||
    location.pathname === "/search" ||
    location.pathname === "/saved" ||
    location.pathname === "/me" ||
    location.pathname === "/settings" ||
    location.pathname.endsWith("/profile") ||
    location.pathname.startsWith("/posts/");

  // Check if it's a user page (but not /profile)
  const isUserHomePage =
    location.pathname.startsWith("/users/") &&
    !location.pathname.endsWith("/profile");

  // Extract username from path
  const username = isUserHomePage ? location.pathname.split("/")[2] : null;

  function handleSubscribedClick(e) {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      navigate("/?feed=subscribed");
    }
  }

  function toggleSearchbar() {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setSearchQuery("");
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSearchBar(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`header header-${variant}`}>
      <div className="header-top">
        <div className="header-left">
          <Link to="/">
            <div className="header-logo">URTEXT</div>
          </Link>
        </div>
        <div className="header-right">
          <div className="search-container" ref={searchContainerRef}>
            <button onClick={toggleSearchbar} className="header-right-button">
              <img src={searchIcon} alt="search" className="search-icon" />
            </button>

            {showSearchBar && (
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}
          </div>
          <div>
            <Link to="/posts/new">
              <button className="header-right-button">
                <img
                  src={addIcon}
                  alt="add-post"
                  className="header-right-icon"
                />
              </button>
            </Link>
          </div>
          <div>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {showMainPostOptions && (
        <div className="header-bottom">
          <MainPostOptions handleSubscribedClick={handleSubscribedClick} />
        </div>
      )}

      {isUserHomePage && (
        <div className="header-bottom">
          <HomePageOptions username={username} />
        </div>
      )}
    </header>
  );
}
