# 🍷 WinerWines - Plataforma de Vinos Boutique Argentinos

[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-ffa726?logo=firebase)](https://firebase.google.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Plataforma de e-commerce moderna especializada en vinos boutique y artesanales de Argentina. Conecta directamente a clientes con pequeñas bodegas, proyectos artesanales e ingenieros apasionados por la viticultura.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [Integración Firebase](#integración-firebase)
- [Deployment](#deployment)
- [Debugging](#debugging)

---

## ✨ Características

### 🛒 Carrito Inteligente
- Agregar/eliminar productos en tiempo real
- Modal interactivo con información completa
- Cálculo automático de totales
- Integración directa con WhatsApp

### 📱 Diseño Responsive
- Mobile-first approach
- Breakpoints optimizados: 480px, 768px, 1024px, 1200px
- Navegación adaptativa con menú hamburguesa
- Imágenes y videos optimizados

### 🧭 Navegación SPA Profesional
- React Router Dom v7 para navegación sin recarga
- Rutas dinámicas para filtros (cepas, bodegas)
- URLs amigables y compartibles

### 🔥 Integración Firebase Firestore
- Base de datos en tiempo real
- Carga dinámica de productos
- Escalabilidad automática
- Backups automáticos

### 💬 Integración WhatsApp
- Botón flotante persistente
- Botón en carrito para compra directa
- Mensajes automáticos con detalles del pedido
- Links compatibles con web y mobile

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 19.1 | Librería UI principal |
| React Router DOM | 7.9 | Enrutamiento SPA |
| Vite | 7.1 | Build tool y dev server |
| Firebase SDK | 12.7 | Integración Firestore |
| SweetAlert2 | 11.26 | Notificaciones |
| EmailJS | 4.4 | Envío de emails |
| CSS3 | - | Estilos responsivos |
| ESLint | 9.36 | Linting |

---

## 🚀 Instalación

### Requisitos Previos
```bash
Node.js ≥ 18.0.0
npm ≥ 9.0.0
Cuenta Firebase con Firestore
```

### Paso 1: Clonar Repositorio
```bash
git clone https://github.com/darioGuaraz/winers-wines.git
cd winers-wines
```

### Paso 2: Instalar Dependencias
```bash
npm install
```

### Paso 3: Configurar Variables de Entorno
Crear `.env.local` en la raíz:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### Paso 4: Ejecutar en Desarrollo
```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

### Paso 5: Build para Producción
```bash
npm run build
npm run preview
```

---

## 📁 Estructura del Proyecto

```
winers-wines/
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   ├── filterbar/          # Filtros por cepa/bodega
│   │   │   ├── navbar/             # Navegación principal
│   │   │   ├── header/             # Sección hero
│   │   │   ├── footer/             # Pie de página
│   │   │   ├── cart/               # Carrito de compras
│   │   │   ├── product/            # ProductCard reutilizable
│   │   │   ├── whatsappBubble/     # Botón WhatsApp
│   │   │   └── CartManager.jsx     # Gestor carrito + productos
│   │   └── pages/
│   │       ├── home/               # Página principal
│   │       ├── about/              # Quiénes Somos
│   │       ├── contact/            # Contacto
│   │       └── testify/            # Testimonios
│   ├── context/
│   │   └── CartContext.jsx         # Context global
│   ├── config/
│   │   └── firebase.js             # Configuración Firebase
│   ├── services/
│   │   └── productService.js       # Servicio de productos
│   ├── constants/
│   │   └── appConstants.js         # Constantes compartidas
│   ├── App.jsx                     # Componente raíz
│   └── main.jsx                    # Punto de entrada
├── public/
│   └── img/                        # Imágenes y videos
├── .env.local                      # Variables de entorno
├── vite.config.js
└── package.json
```

---

## 🏗️ Arquitectura

### Flujo de Datos

```
Firebase Firestore (Fuente única de verdad)
         ↓
productService.js
         ↓
CartContext (Estado global)
         ↓
Componentes consumidores
         ↓
ProductCard (Componente reutilizable)
         ↓
DOM
```

### Context API Structure

```javascript
{
  // Estado de productos
  products,      // Array de Firestore
  loading,       // boolean
  error,         // string | null
  
  // Estado de carrito
  cartItems,     // Array de items
  
  // Funciones
  addToCart,     // Agregar producto
  removeSelected,// Eliminar seleccionados
  clearCart,     // Vaciar carrito
  handleBuy      // Enviar a WhatsApp
}
```

### Patrones de Arquitectura

- **SPA**: React Router para navegación sin recarga
- **Component-Based**: Componentes pequeños y reutilizables
- **State Management**: Context API + Hooks
- **Responsive Design**: Mobile-first
- **Separation of Concerns**: Services, Context, Components

---

## 🔥 Integración Firebase

### Configuración Inicial

1. Crea proyecto en [Firebase Console](https://console.firebase.google.com)
2. Activa Firestore Database (modo desarrollo)
3. Copia credenciales en `.env.local`

### Estructura Firestore

```
Collection: productos
├── Document (auto-id)
│   ├── titulo: string
│   ├── precio: number
│   ├── descripcion: string
│   ├── imagen: string
│   ├── cepa: string
│   └── bodega: string
```

### Agregar Productos

En Firebase Console → Firestore → Add Document en collection `productos`:

```json
{
  "titulo": "Malbec Reserva",
  "precio": 200,
  "descripcion": "Vino de alta calidad",
  "imagen": "/img/vino1.png",
  "cepa": "malbec",
  "bodega": "Bodega Elite"
}
```

---

## 💻 Guía de Desarrollo

### Crear Componente

```jsx
// src/assets/components/ejemplo/Ejemplo.jsx
import React from "react";
import "./ejemplo.css";

const Ejemplo = ({ prop1, prop2 }) => {
  return <div className="ejemplo">{/* JSX */}</div>;
};

export default Ejemplo;
```

### Crear Página

```jsx
// src/assets/pages/ejemplo/Ejemplo.jsx
import Header from "../../components/header/Header";
import "./ejemplo.css";

function Ejemplo() {
  return (
    <div>
      <Header />
      {/* Contenido */}
    </div>
  );
}

export default Ejemplo;
```

Agregar ruta en `App.jsx`:

```jsx
<Route path="/ejemplo" element={<Ejemplo />} />
```

### Usar Constantes

```javascript
import { WINE_CEPAS, THEME_COLORS } from "../constants/appConstants";

// Acceder
WINE_CEPAS.forEach(c => console.log(c.nombre));
console.log(THEME_COLORS.primary);
```

### Usar Context

```javascript
import { useCart } from "../hooks/useCart";

function Componente() {
  const { products, cartItems, addToCart, loading } = useCart();
  
  return (
    <>
      {loading ? <p>Cargando...</p> : <p>{products.length} productos</p>}
      <button onClick={() => addToCart(producto)}>Agregar</button>
    </>
  );
}
```

### Convenciones de Código

✅ **Nombres descriptivos**
```javascript
const handleAddToCart = (product) => {}
const WINE_CEPAS = []
const isLoading = false
```

❌ **Evitar abreviaciones**
```javascript
const handleAdd = (p) => {}
const cps = []
const loading = false
```

---

## 🎨 Personalización

### Colores del Tema

Editar `src/constants/appConstants.js`:

```javascript
export const THEME_COLORS = {
  primary: "#570229",
  secondary: "#3d1620",
  accent: "#dfca6e",
  error: "#d32f2f",
  success: "#4caf50",
  light: "#fffef7ff",
  dark: "#1a0f0a",
};
```

### Cambiar Número WhatsApp

En `appConstants.js`:

```javascript
export const WHATSAPP_PHONE = "tu_numero_aqui";
```

### Agregar Cepas

En `appConstants.js`:

```javascript
export const WINE_CEPAS = [
  { id: "tu_cepa", nombre: "Tu Cepa" },
  // ...
];
```

---

## 📱 Responsive Breakpoints

| Dispositivo | Ancho | Columns |
|-----------|-------|---------|
| Mobile | < 480px | 1 |
| Mobile | 480-768px | 1-2 |
| Tablet | 768-1024px | 2-3 |
| Desktop | > 1024px | 3+ |

---

## 🚀 Deployment

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Subir carpeta 'dist' a Netlify
```

### Configurar Variables de Entorno

En tu plataforma de deployment:
1. Settings → Environment Variables
2. Agregar todas las `VITE_FIREBASE_*`

---

## 🐛 Debugging

### Errores Comunes

**1. "Products undefined"**
```javascript
// Verificar CartProvider en App.jsx
<CartProvider>
  <App />
</CartProvider>
```

**2. "Firestore collection not found"**
- Verificar que Firestore existe
- Nombre de collection es "productos"
- Revisar reglas de seguridad

**3. "WhatsApp no abre"**
- Número con formato: 541234567890
- Revisar URL encoding
- Probar en navegador diferente

### Verificar Estado

```javascript
console.log("Productos:", products);
console.log("Carrito:", cartItems);
console.log("Loading:", loading);
console.log("Error:", error);
```

---

## 📈 Roadmap

### Fase 1 - Actual ✅
- [x] Landing page
- [x] Carrito de compras
- [x] Firebase Firestore
- [x] WhatsApp integration
- [x] Responsive design

### Fase 2 - Próximo Sprint
- [ ] Autenticación de usuarios
- [ ] Órdenes persistentes
- [ ] Historial de compras
- [ ] Wishlist/Favoritos
- [ ] Búsqueda avanzada

### Fase 3 - Largo Plazo
- [ ] Backend Node.js/Express
- [ ] Sistema de pagos
- [ ] Panel administrativo
- [ ] Gestión de inventario
- [ ] Analytics

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea rama: `git checkout -b feature/MiFeature`
3. Commit: `git commit -m 'Add MiFeature'`
4. Push: `git push origin feature/MiFeature`
5. Abre Pull Request

---

## 📝 Licencia

MIT - Ver [LICENSE](LICENSE) para detalles

---

## 👥 Autor

**Dario Guaraz**
- GitHub: [@darioGuaraz](https://github.com/darioGuaraz)
- Email: darioguaraz@gmail.com
- WhatsApp: +54 9 11 6790-7664

---

## 📚 Recursos

- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Vite Docs](https://vitejs.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)

---

<div align="center">

**Hecho con 🍷 y ❤️ por [Dario Guaraz](https://github.com/darioGuaraz)**

Versión 1.0.0 | 30 de Diciembre, 2025

[⬆ Volver al inicio](#-winers-wines---plataforma-de-vinos-boutique-argentinos)

</div>
