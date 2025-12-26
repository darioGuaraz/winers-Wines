import React from "react";
import "./footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Sección: Sobre Winers Wines */}
          <div className="footer-section footer-about">
            <h3 className="footer-title">Winers Wines</h3>
            <p className="footer-description">
              Somos una distribuidora especializada en la selección y
              distribución de vinos de alta calidad. Nos comprometemos a ofrecer
              las mejores opciones para los amantes del vino.
            </p>
            <div className="footer-logo">
              <img
                src="/img/headerlogo.png"
                alt="Winers Wines Logo"
                className="logo-img"
              />
            </div>
          </div>

          {/* Sección: Enlaces Rápidos */}
          <div className="footer-section footer-links">
            <h3 className="footer-title">Enlaces Rápidos</h3>
            <ul className="footer-list">
              <li>
                <a href="/">Inicio</a>
              </li>
              <li>
                <a href="/about">Nosotros</a>
              </li>
              <li>
                <a href="/testify">Testimonios</a>
              </li>
              <li>
                <a href="/contact">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Sección: Categorías */}
          <div className="footer-section footer-categories">
            <h3 className="footer-title">Categorías</h3>
            <ul className="footer-list">
              <li>
                <a href="/?cepa=Malbec">Malbec</a>
              </li>
              <li>
                <a href="/?cepa=Cabernet">Cabernet</a>
              </li>
              <li>
                <a href="/?cepa=Merlot">Merlot</a>
              </li>
              <li>
                <a href="/?cepa=Torrontés">Torrontés</a>
              </li>
            </ul>
          </div>

          {/* Sección: Contacto */}
          <div className="footer-section footer-contact">
            <h3 className="footer-title">Contacto</h3>
            <div className="contact-item">
              <p className="contact-label">Teléfono:</p>
              <a
                href="https://wa.me/541167907664"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                +54 9 11 6790-7664
              </a>
            </div>
            <div className="contact-item">
              <p className="contact-label">Email:</p>
              <a href="mailto:darioguaraz@gmail.com" className="contact-link">
                darioguaraz@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisora */}
        <div className="footer-divider"></div>

        {/* Copyright y redes sociales */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              &copy; {currentYear} <strong>Winers Wines</strong>. Todos los
              derechos reservados.
            </p>
          </div>
          <div className="footer-social">
            <a
              href="https://wa.me/541167907664"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link whatsapp"
              title="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  id="Icon_awesome-phone-alt"
                  data-name="Icon awesome-phone-alt"
                  d="M22.517,16.379l-5.07-2.173a1.086,1.086,0,0,0-1.268.312l-2.245,2.743A16.78,16.78,0,0,1,5.912,9.24L8.656,6.995a1.084,1.084,0,0,0,.312-1.268L6.795.657A1.094,1.094,0,0,0,5.55.028L.842,1.114A1.086,1.086,0,0,0,0,2.173,21,21,0,0,0,21.005,23.178a1.086,1.086,0,0,0,1.059-.842l1.086-4.708a1.1,1.1,0,0,0-.634-1.249Z"
                  transform="translate(0 0)"
                  fill="#fff"
                />
              </svg>
            </a>
            <a
              href="mailto:darioguaraz@gmail.com"
              className="social-link email"
              title="Email"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
