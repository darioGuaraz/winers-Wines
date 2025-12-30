/**
 * Constantes compartidas de la aplicación
 * Centraliza datos que se usan en múltiples componentes
 */

// Contacto
export const WHATSAPP_PHONE = "541167907664";
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola! Vi su sitio y me gustaría obtener más información."
);
export const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${WHATSAPP_MESSAGE}`;

// Cepas de vino disponibles
export const WINE_CEPAS = [
  { id: "malbec", nombre: "Malbec" },
  { id: "merlot", nombre: "Merlot" },
  { id: "syrah", nombre: "Syrah" },
  { id: "cabernet", nombre: "Cabernet Sauvignon" },
  { id: "bonarda", nombre: "Bonarda" },
  { id: "petit_verdot", nombre: "Petit Verdot" },
];

// Mapeo de cepa ID a nombre legible
export const CEPA_DISPLAY_MAP = {
  malbec: "Malbec",
  merlot: "Merlot",
  syrah: "Syrah",
  cabernet: "Cabernet Sauvignon",
  bonarda: "Bonarda",
  petit_verdot: "Petit Verdot",
};

// Bodegas disponibles
export const WINE_BODEGAS = [
  "Bodega Pampa",
  "Bodega Premium",
  "Bodega Elite",
  "Bodega Clásica",
  "Bodega Tradicional",
  "Bodega Exclusiva",
];

// Colores del tema
export const THEME_COLORS = {
  primary: "#570229",
  secondary: "#3d1620",
  accent: "#dfca6e",
  error: "#d32f2f",
  success: "#4caf50",
  warning: "#ff9800",
  light: "#fffef7ff",
  dark: "#1a0f0a",
};

// Breakpoints para responsive
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  large: 1200,
};

// Redes sociales
export const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/541167907664",
  email: "darioguaraz@gmail.com",
  instagram: "https://instagram.com/winerwines",
  facebook: "https://facebook.com/winerwines",
};

// Textos comunes
export const MESSAGES = {
  loading: "Cargando productos...",
  noProducts: "No hay vinos disponibles",
  addedToCart: "fue añadido al carrito",
  cartEmpty: "Tu carrito está vacío",
  totalLabel: "Total:",
  noProductsError: "No encontramos vinos disponibles",
};

// URLs de imágenes
export const IMAGE_PATHS = {
  logo: "/img/headerlogo1.png",
  cart: "/img/carrito.png",
  whatsappIcon: "/img/wspico.png",
};
