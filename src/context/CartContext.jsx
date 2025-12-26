import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto - envuelve la app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agregar un producto al carrito
  const addToCart = (producto) => {
    setCartItems((prev) => [
      ...prev,
      { ...producto, cartId: Date.now() + Math.random() },
    ]);
  };

  // Remover ítems seleccionados
  const removeSelected = (ids) => {
    setCartItems((prev) => prev.filter((item) => !ids.includes(item.cartId)));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Realizar compra por WhatsApp
  const handleBuy = () => {
    const phoneNumber = "5491167907664";
    const total = cartItems.reduce((acc, item) => acc + item.precio, 0);
    const listaProductos = cartItems
      .map((item) => `• ${item.titulo} - $${item.precio}`)
      .join("%0A");
    const mensaje = `Hola, quiero realizar la siguiente compra:%0A%0A${listaProductos}%0A%0ATotal: $${total}`;
    window.open(`https://wa.me/${phoneNumber}?text=${mensaje}`, "_blank");
  };

  const value = {
    cartItems,
    addToCart,
    removeSelected,
    clearCart,
    handleBuy,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de CartProvider");
  }
  return context;
};
