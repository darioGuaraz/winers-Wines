import React, { useState, useEffect, useRef } from "react";
import { IMAGE_PATHS } from "../../../constants/appConstants";
import "./cart.css";
import { useCart } from "../../../hooks/useCart";

const Cart = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const { cartItems, removeSelected, clearCart, handleBuy } = useCart();

  // Cerrar modal al clickear fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isModalOpen]);

  // Mostrar burbuja del carrito siempre (con o sin items)
  // Solo abrir modal si hay items en el carrito
  const handleCartClick = () => {
    if (cartItems.length > 0) {
      setIsModalOpen(true);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.precio, 0);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Burbuja del carrito */}
      <button
        className="cart-bubble"
        onClick={handleCartClick}
        aria-label="Abrir carrito"
        title={
          cartItems.length === 0
            ? "Carrito vacío - Agrega productos para comprar"
            : `${cartItems.length} producto(s) en tu carrito`
        }
      >
        <img src={IMAGE_PATHS.cart} alt="Carrito" />
        <span className="cart-counter">{cartItems.length}</span>
      </button>

      {/* Modal del carrito - Solo mostrar si hay items */}
      {isModalOpen && cartItems.length > 0 && (
        <div className="cart-modal-overlay">
          <div className="cart-modal" ref={modalRef}>
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
              aria-label="Cerrar carrito"
            >
              ✕
            </button>

            <h2>Tu Carrito</h2>

            <ul className="cart-items-list">
              {cartItems.map((item) => (
                <li key={item.cartId} className="cart-item">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.cartId)}
                    onChange={() => toggleSelect(item.cartId)}
                  />
                  <div className="item-info">
                    <span className="item-title">{item.titulo}</span>
                    <span className="item-price">${item.precio}</span>
                  </div>
                </li>
              ))}
            </ul>

            <p className="cart-total">Total: ${total}</p>

            <div className="cart-actions">
              <div className="actions-delete">
                <button
                  className="btn-cancel"
                  onClick={() => removeSelected(selectedItems)}
                  disabled={selectedItems.length === 0}
                >
                  Eliminar seleccionados
                </button>
                <button className="btn-clear" onClick={clearCart}>
                  Vaciar carrito
                </button>
              </div>

              <button className="btn-buy" onClick={handleBuy}>
                Realizar compra
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
