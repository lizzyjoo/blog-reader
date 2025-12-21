import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostList from "./PostList";

import "../styles/header.css";
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <div className="header-left">
        <div className="header-logo">URTEXT</div>

        <BrowserRouter>
          <nav className="header-nav">
            <NavLink to="/posts" className="header-link">
              Discover
            </NavLink>
            <NavLink to="/" className="header-link">
              Subscribed
            </NavLink>
          </nav>
        </BrowserRouter>
      </div>
      <div className="header-right"></div>
    </header>
  );
}
