import React from "react";
import Swal from "sweetalert2";
import { useCart } from "../../../hooks/useCart";

/**
 * Componente ProductCard - Tarjeta reutilizable de producto
 *
 * @param {Object} producto - Datos del producto
 * @param {string} producto.id - ID único del producto
 * @param {string} producto.titulo - Nombre del vino
 * @param {number} producto.precio - Precio en pesos
 * @param {string} producto.imagen - URL de la imagen
 * @param {string} producto.descripcion - Descripción del vino
 * @param {string} [producto.bodega] - Nombre de la bodega (opcional)
 * @param {string} [variant] - Variante de display: 'main' (defecto) o 'filtered'
 */
const ProductCard = ({ producto, variant = "main" }) => {
  const { addToCart } = useCart();

  const handleComprar = (prod) => {
    addToCart(prod);

    Swal.fire({
      title: "¡Producto agregado!",
      text: `${prod.titulo} ($${prod.precio}) ${message}`,
      fontFamily: "poppins, sans-serif",
      icon: "success",
      iconColor: "#570229",
      confirmButtonText: "OK",
      background: "#fffef7ff",
      confirmButtonColor: "#570229",
      timer: 1500,
    });
  };

  const message = "fue añadido al carrito.";

  if (variant === "filtered") {
    return (
      <div className="card">
        <img src={producto.imagen} alt={producto.titulo} />
        <h2>{producto.titulo}</h2>
        {producto.bodega && <p className="bodega-name">{producto.bodega}</p>}
        <p>{producto.descripcion}</p>
        <div className="card-footer">
          <span className="precio">${producto.precio}</span>
          <button onClick={() => handleComprar(producto)} className="btnSelect">
            Comprar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <img src={producto.imagen} alt={producto.titulo} />
      <h2>{producto.titulo}</h2>
      <p>{producto.descripcion}</p>
      <span className="precio">${producto.precio}</span>

      <button onClick={() => handleComprar(producto)} className="btnSelect">
        Comprar
      </button>
    </div>
  );
};

export default ProductCard;
