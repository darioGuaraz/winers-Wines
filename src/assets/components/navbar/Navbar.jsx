import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IMAGE_PATHS } from "../../../constants/appConstants";
import "./navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleResize = () => {
      // Responsive behavior handled via CSS media queries
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={IMAGE_PATHS.logo} alt="winers wines" className="navbar-logo" />
        </Link>

        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div
          id="primary-navigation"
          className={`navbar-links ${isMenuOpen ? "active" : ""}`}
        >
          <Link
            to="/"
            onClick={closeMenu}
            className={`nav-link ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
          >
            Quienes Somos
          </Link>

          <Link
            to="/testify"
            onClick={closeMenu}
            className={`nav-link ${isActive("/testify") ? "active" : ""}`}
          >
            Testimonios
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
