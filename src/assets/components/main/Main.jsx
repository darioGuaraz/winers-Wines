import React, { useState, useEffect } from "react";
import "./main.css";
import { useCart } from "../../../hooks/useCart";
import FilterBar from "../filterbar/FilterBar";
import ProductCard from "../product/ProductCard";
import { useParams } from "react-router-dom";

function Main() {
  const [productos, setProductos] = useState([]);
  const { products, loading } = useCart();
  const { cepa, bodega } = useParams();

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

    setProductos(filtered);
  }, [cepa, bodega, products]);

  if (loading) {
    return <main><h1>Cargando productos...</h1></main>;
  }

  return (
    <main>
      <h1>Listado de productos</h1>
      <FilterBar />
      <div className="containerCards-main">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} variant="main" />
        ))}
      </div>
    </main>
  );
}

export default Main;
