import { NavLink } from "react-router-dom";
export default function MainPostOptions({ handleSubscribedClick }) {
  return (
    <nav className="header-nav">
      <NavLink to="/" className="header-link">
        Discover
      </NavLink>
      <NavLink to="/" className="header-link" onClick={handleSubscribedClick}>
        Subscribed
      </NavLink>
    </nav>
  );
}
