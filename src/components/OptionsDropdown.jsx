import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moreIcon from "../assets/more-options.png";
import "../styles/options.css";
export default function OptionsDropdown({
  onEdit,
  onDelete,
  className = "options",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [navigate]);

  const handleToggle = () => {
    if (!isOpen && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setIsOpen((prev) => !prev);
  };

  const handleEdit = () => {
    setIsOpen(false);
    if (onEdit) onEdit();
  };

  const handleDelete = () => {
    setIsOpen(false);
    if (onDelete) onDelete();
  };

  return (
    <div className={`${className}-popup`} ref={dropdownRef}>
      <img
        ref={iconRef}
        src={moreIcon}
        alt="options"
        className={`${className}-options-icon`}
        onClick={handleToggle}
      />
      {isOpen && (
        <nav
          className={`${className}-popup-window open`}
          style={{
            position: "fixed",
            top: position.top,
            right: position.right,
          }}
        >
          <ul>
            {onEdit && <li onClick={handleEdit}>Edit</li>}
            <li onClick={handleDelete}>Delete</li>
          </ul>
        </nav>
      )}
    </div>
  );
}
