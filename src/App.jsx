import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/navbar/Navbar";
import Footer from "./assets/components/footer/Footer";
import Home from "./assets/pages/home/Home";
import About from "./assets/pages/about/About";
import Testify from "./assets/pages/testify/Testify";
import Contact from "./assets/pages/contact/Contact";
import Main from "./assets/components/main/Main";
import WhatsAppBubble from "./assets/components/whatsappBubble/WhatsAppBubble.jsx";
import { CartProvider } from "./context/CartContext";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <WhatsAppBubble />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vinos/:cepa" element={<Main />} />
          <Route path="/bodega/:bodega" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/testify" element={<Testify />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
