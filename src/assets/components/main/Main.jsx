import React, { useState, useEffect } from "react";
import "./main.css";
import { useCart } from "../../../hooks/useCart";
import FilterBar from "../filterbar/FilterBar";
import ProductCard from "../product/ProductCard";
import { useParams } from "react-router-dom";

function Main() {
  const [productos, setProductos] = useState([]);
  const { products, loading, error } = useCart();
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
    return (
      <main>
        <h1>Cargando productos...</h1>
        <p style={{ textAlign: 'center', color: '#666' }}>Por favor espera un momento...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Error al cargar productos</h1>
        <p style={{ textAlign: 'center', color: '#d32f2f' }}>{error}</p>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Revisa tu conexión a internet y recarga la página (F5)
        </p>
      </main>
    );
  }

  if (!productos || productos.length === 0) {
    return (
      <main>
        <h1>Listado de productos</h1>
        <FilterBar />
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>No se encontraron productos con los filtros seleccionados.</p>
        </div>
      </main>
    );
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
