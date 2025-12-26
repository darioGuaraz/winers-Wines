import React, { useState } from "react";
import Swal from "sweetalert2";
import "./contact.css";
import emailjs from "@emailjs/browser";

// Inicializar EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.message) {
      Swal.fire({
        title: "Campo requerido",
        text: "Por favor completa todos los campos",
        icon: "warning",
        confirmButtonColor: "#570229",
        background: "#fffef7ff",
      });
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        }
      );

      Swal.fire({
        title: "¡Mensaje enviado!",
        text: "Tu consulta ha sido enviada con éxito.",
        icon: "success",
        confirmButtonColor: "#570229",
        background: "#fffef7ff",
      });

      setFormData({ email: "", message: "" });
    } catch (error) {
      console.error("Error EmailJS:", error);

      Swal.fire({
        title: "Error",
        text: "No se pudo enviar el mensaje. Intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "#570229",
        background: "#fffef7ff",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <div className="contact-masonry">
          <div className="contact-card card-developer">
            <h2>Desarrollado por</h2>
            <p className="developer-name">Dario Hernan Guaraz</p>

            <video src="/img/heroVideoAbout.mp4" autoPlay loop muted></video>
          </div>

          <div className="container2contact">
            <div className="contact-card card-form">
              <h2>Envíanos tu Consulta</h2>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="email">Tu Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos tu consulta..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar Consulta"}
                </button>
              </form>
            </div>
            <div className="contact-details">
              <p className="phone-label">Teléfono de Contacto:</p>
              <a
                href="https://wa.me/541167907664"
                target="_blank"
                rel="noopener noreferrer"
                className="phone-link"
              >
                +54 9 11 6790-7664
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
