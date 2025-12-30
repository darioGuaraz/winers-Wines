import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WINE_CEPAS, WINE_BODEGAS } from "../../../constants/appConstants";
import "./filterbar.css";

const FilterBar = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const menuRef = useRef(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setExpandedSection(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCepaClick = (cepaId) => {
    navigate(`/vinos/${cepaId}`);
    setExpandedSection(null);
  };

  const handleBodegaClick = (bodega) => {
    navigate(`/bodega/${bodega}`);
    setExpandedSection(null);
  };

  const handleViewAll = () => {
    navigate("/");
    setExpandedSection(null);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="filterbar-inline" ref={menuRef}>
      <div className="filter-item">
        <button className="filter-btn todos-btn" onClick={handleViewAll}>
          <span className="filter-icon">🍷</span>
          Todos los Vinos
        </button>
      </div>

      <div className="filter-item">
        <button
          className={`filter-btn expandable-btn ${
            expandedSection === "cepas" ? "active" : ""
          }`}
          onClick={() => toggleSection("cepas")}
        >
          <span className="filter-icon">🍇</span>
          Cepas
          <span
            className={`arrow ${expandedSection === "cepas" ? "up" : "down"}`}
          >
            ▼
          </span>
        </button>

        {expandedSection === "cepas" && (
          <ul className="filter-dropdown cepas-dropdown">
            {WINE_CEPAS.map((c) => (
              <li key={c.id}>
                <button
                  className="dropdown-item"
                  onClick={() => handleCepaClick(c.id)}
                >
                  {c.nombre}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="filter-item">
        <button
          className={`filter-btn expandable-btn ${
            expandedSection === "bodegas" ? "active" : ""
          }`}
          onClick={() => toggleSection("bodegas")}
        >
          <span className="filter-icon">🏭</span>
          Bodegas
          <span
            className={`arrow ${expandedSection === "bodegas" ? "up" : "down"}`}
          >
            ▼
          </span>
        </button>

        {expandedSection === "bodegas" && (
          <ul className="filter-dropdown bodegas-dropdown">
            {WINE_BODEGAS.map((bodega) => (
              <li key={bodega}>
                <button
                  className="dropdown-item"
                  onClick={() => handleBodegaClick(bodega)}
                >
                  {bodega}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
