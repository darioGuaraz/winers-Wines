import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import menu from "../../data/menu.json";
import "./filteredwines.css";
import { useCart } from "../../../context/CartContext";
import FilterBar from "../../components/filterbar/FilterBar";
import Swal from "sweetalert2";

const FilteredWines = () => {
  const { cepa, bodega } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    let filtered = menu;

    if (cepa) {
      filtered = filtered.filter((wine) => wine.cepa === cepa);
    }

    if (bodega) {
      filtered = filtered.filter(
        (wine) => wine.bodega === decodeURIComponent(bodega)
      );
    }

    setFilteredProducts(filtered);
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

  const getCepaDisplay = (cepaId) => {
    const cepasMap = {
      malbec: "Malbec",
      merlot: "Merlot",
      syrah: "Syrah",
      cabernet: "Cabernet Sauvignon",
      bonarda: "Bonarda",
      petit_verdot: "Petit Verdot",
    };
    return cepasMap[cepaId] || cepaId;
  };

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
          <div key={producto.id} className="card">
            <img src={producto.imagen} alt={producto.titulo} />
            <h2>{producto.titulo}</h2>
            <p className="bodega-name">{producto.bodega}</p>
            <p>{producto.descripcion}</p>
            <div className="card-footer">
              <span className="precio">${producto.precio}</span>
              <button
                onClick={() => handleComprar(producto)}
                className="btnSelect"
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default FilteredWines;
