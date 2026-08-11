import { useEffect, useState } from "react";
import {
  Search,
  Menu,
  Sun,
  Moon,
} from "lucide-react";

function Navbar({ onSearch }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    applyDarkMode(savedDarkMode);
  }, []);

  // Apply dark mode to body
  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  // Toggle dark mode
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    applyDarkMode(newMode);
  };

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <nav className="navbar">

      <div className="navbar-left">
        <div className="logo">
          NEWS<span>HUB</span>
        </div>
      </div>

      <div className="search-box">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="navbar-right">

        <button 
          className="theme-btn" 
          onClick={toggleTheme}
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="menu-btn">
          <Menu size={24} />
        </button>

      </div>

    </nav>
  );
}

export default Navbar;

