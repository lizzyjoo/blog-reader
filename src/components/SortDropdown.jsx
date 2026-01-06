// SortDropdown.jsx
import { useState, useRef, useEffect } from "react";
import "../styles/dropdown.css";

export default function SortDropdown({ sortBy, setSortBy, options }) {
  const [isOpen, setIsOpen] = useState(false);
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

  // Get current label
  const currentLabel =
    options.find((opt) => opt.value === sortBy)?.label || "Sort";

  function handleSelect(value) {
    setSortBy(value);
    setIsOpen(false);
  }

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button
        className="sort-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLabel}
        <span className={`arrow ${isOpen ? "up" : "down"}`}>▼</span>
      </button>

      {isOpen && (
        <ul className="sort-dropdown-menu">
          {options.map((option) => (
            <li key={option.value}>
              <button
                className={sortBy === option.value ? "active" : ""}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
