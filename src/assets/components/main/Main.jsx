import React, { useState, useEffect } from "react";
import "./main.css";
import menuData from "../../data/menu.json";
import Swal from "sweetalert2";
import { useCart } from "../../../context/CartContext";
import FilterBar from "../filterbar/FilterBar";
import { useParams } from "react-router-dom";

function Main() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart();
  const { cepa, bodega } = useParams();

  useEffect(() => {
    let filtered = menuData;

    if (cepa) {
      filtered = filtered.filter((wine) => wine.cepa === cepa);
    }

    if (bodega) {
      filtered = filtered.filter(
        (wine) => wine.bodega === decodeURIComponent(bodega)
      );
    }

    setProductos(filtered);
  }, [cepa, bodega]);

  const handleComprar = (producto) => {
    addToCart(producto);

    Swal.fire({
      title: "¡Producto agregado!",
      text: `${producto.titulo} ($${producto.precio}) fue añadido al carrito.`,
      fontFamily: "poppins, sans-serif",
      icon: "success",
      iconColor: "#570229",
      confirmButtonText: "OK",
      background: "#fffef7ff",

      confirmButtonColor: "#570229",
      timer: 1500,
    });
  };

  return (
    <main>
      <h1>Listado de productos</h1>
      <FilterBar />
      <div className="containerCards-main">
        {productos.map((producto) => (
          <div key={producto.id} className="card">
            <img src={producto.imagen} alt={producto.titulo} />
            <h2>{producto.titulo}</h2>
            <p>{producto.descripcion}</p>
            <span className="precio">${producto.precio}</span>

            <button
              onClick={() => handleComprar(producto)}
              className="btnSelect"
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Main;
