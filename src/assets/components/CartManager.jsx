import Main from "./main/Main";
import Cart from "./cart/Cart";

// Con Context, CartManager es mucho más simple!
// El estado se maneja en CartContext y se accede desde los componentes que lo necesitan
const CartManager = () => {
  return (
    <>
      <Main />
      <Cart />
    </>
  );
};

export default CartManager;
