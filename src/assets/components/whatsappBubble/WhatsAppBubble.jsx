import React from "react";
import { WHATSAPP_URL, IMAGE_PATHS } from "../../../constants/appConstants";
import "./whatsAppBubble.css";

const WhatsAppBubble = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-bubble"
    aria-label="Contactar por WhatsApp"
  >
    <img src={IMAGE_PATHS.whatsappIcon} alt="WhatsApp" />
  </a>
);

export default WhatsAppBubble;
