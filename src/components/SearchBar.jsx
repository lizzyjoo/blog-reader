import { useNavigate } from "react-router-dom";
import "../styles/header.css";
export default function SearchBar({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
        autoFocus
        className="search-input"
      />
    </form>
  );
}
