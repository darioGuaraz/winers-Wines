import React, { createContext, useState, useEffect } from "react";
import { getProducts } from "../services/productService";

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto - envuelve la app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos de Firebase al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Log para debugging
        console.log("Iniciando carga de productos...");

        const data = await getProducts();

        console.log(`Productos cargados: ${data.length}`, data);

        if (!data || data.length === 0) {
          setError(
            "No se encontraron productos. Revisa tu conexión a Firebase."
          );
          console.warn("⚠️ Firebase retornó 0 productos");
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error("❌ Error cargando productos:", err);
        setError(
          `Error: ${err.message || "Error desconocido al cargar productos"}`
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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
    products,
    loading,
    error,
    addToCart,
    removeSelected,
    clearCart,
    handleBuy,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Export CartContext for use in hooks
export { CartContext };
