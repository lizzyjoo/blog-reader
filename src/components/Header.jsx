import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import userIcon from "../assets/user.png";
import searchIcon from "../assets/search.png";
import addIcon from "../assets/add.png";
import PostList from "./PostList";
import "../styles/header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
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
          <NavLink to="/" className="header-link">
            Subscribed
          </NavLink>
        </nav>
      </div>
      <div className="header-right">
        <div>
          <Link>
            <img
              src={searchIcon}
              alt="search"
              className="header-right-icon"
            ></img>
          </Link>
        </div>
        <div>
          <Link to="/posts/new">
            <img
              src={addIcon}
              alt="add-post"
              className="header-right-icon"
            ></img>
          </Link>
        </div>
        <div>
          {/* want this to be a dropdown */}
          <img src={userIcon} alt="profile" className="header-right-icon"></img>
        </div>
      </div>
    </header>
  );
}
