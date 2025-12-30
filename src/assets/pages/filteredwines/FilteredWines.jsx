import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CEPA_DISPLAY_MAP } from "../../../constants/appConstants";
import "./filteredwines.css";
import { useCart } from "../../../hooks/useCart";
import FilterBar from "../../components/filterbar/FilterBar";
import ProductCard from "../../components/product/ProductCard";

const FilteredWines = () => {
  const { cepa, bodega } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products, loading } = useCart();

  useEffect(() => {
    let filtered = products;

    if (cepa) {
      filtered = filtered.filter((wine) => wine.cepa === cepa);
    }

    if (bodega) {
      filtered = filtered.filter(
        (wine) => wine.bodega === decodeURIComponent(bodega)
      );
    }

    setFilteredProducts(filtered);
  }, [cepa, bodega, products]);

  const getCepaDisplay = (cepaId) => {
    return CEPA_DISPLAY_MAP[cepaId] || cepaId;
  };

  if (loading) {
    return <main><h1>Cargando productos...</h1></main>;
  }

  if (filteredProducts.length === 0) {
    return (
      <main>
        <h1>Listado de productos</h1>
        <FilterBar />
        <div className="no-products">
          <h2>No hay vinos disponibles</h2>
          <p>
            {cepa
              ? `No encontramos vinos de la cepa: ${getCepaDisplay(cepa)}`
              : bodega
              ? `No encontramos vinos de la bodega: ${bodega}`
              : "No hay productos disponibles"}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>
        {cepa
          ? `Vinos ${getCepaDisplay(cepa)}`
          : bodega
          ? `Vinos de ${bodega}`
          : "Todos los Vinos"}
      </h1>
      <FilterBar />

      <div className="wines-grid">
        {filteredProducts.map((producto) => (
          <ProductCard key={producto.id} producto={producto} variant="filtered" />
        ))}
      </div>
    </main>
  );
};

export default FilteredWines;
