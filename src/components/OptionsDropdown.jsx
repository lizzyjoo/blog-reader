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
  const navigate = useNavigate();
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

  useEffect(() => {
    setIsOpen(false);
  }, [navigate]);

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
        src={moreIcon}
        alt="options"
        className={`${className}-options-icon`}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <nav className={`${className}-popup-window open`}>
          <ul>
            {onEdit && <li onClick={handleEdit}>Edit</li>}
            <li onClick={handleDelete}>Delete</li>
          </ul>
        </nav>
      )}
    </div>
  );
}
