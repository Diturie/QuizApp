import React, { useState } from "react";
import "../styles/Header.css";

const Header = ({ onSelectCategory }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = ["HTML", "CSS", "JavaScript", "React", "SQL", "PHP"];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="logo">CodeQuest</div>
      <nav className="nav">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className="category-button"
          >
            {category}
          </button>
        ))}
      </nav>
      <div className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </div>
      <div className={`menu-items ${menuOpen ? "show" : ""}`}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              onSelectCategory(category);
              setMenuOpen(false); // Mbyll menune pas perzgjedhjes
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;

