# 🔐 Reglas de Seguridad Firestore - WinerWines

## ⚠️ PROBLEMA ACTUAL

Tu base de datos está con reglas públicas, lo que permite que **cualquiera** pueda:

- Leer todos los datos
- Modificar o borrar productos
- Crear colecciones no autorizadas
- Acceder a información sensible

---

## ✅ SOLUCIÓN: Reglas Seguras

### Opción 1: SOLO LECTURA (Recomendado para tu caso)

**Esta es la mejor opción si solo necesitas que los clientes lean los productos**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública de productos
    match /productos/{document=**} {
      allow read: if true;  // Público - cualquiera puede ver
      allow write: if false; // Privado - nadie puede escribir
    }

    // Denegar acceso a otras colecciones
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

### Opción 2: CON AUTENTICACIÓN DE EMAIL (Más Seguro)

**Si quieres permitir que solo usuarios registrados escriban datos**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública de productos
    match /productos/{document=**} {
      allow read: if true;
      allow write: if false; // Solo administradores pueden escribir
    }

    // Colección de usuarios
    match /users/{uid} {
      allow read: if request.auth.uid == uid;
      allow write: if request.auth.uid == uid;
    }

    // Denegar todo lo demás
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

### Opción 3: CON ADMIN PANEL (Máxima Seguridad)

**Si tienes un panel de administración separado**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública de productos
    match /productos/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }

    // Colección de configuración (solo admin)
    match /admin/{document=**} {
      allow read, write: if request.auth.token.admin == true;
    }

    // Denegar todo lo demás
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 📝 PASOS PARA IMPLEMENTAR

### 1. Ve a Firebase Console

```
https://console.firebase.google.com/
→ Tu Proyecto
→ Firestore Database
→ Rules (pestaña)
```

### 2. Reemplaza las reglas

- Limpia las reglas actuales
- Pega una de las opciones arriba
- Click en "Publicar"

### 3. Verifica

Debería mostrarte un ✅ verde indicando que las reglas son válidas

---

## 🎯 RECOMENDACIÓN PARA TU PROYECTO

Dado que tu aplicación solo **NECESITA**:

- ✅ Lectura de productos (público)
- ✅ Carrito en cliente (localStorage)
- ✅ Compra por WhatsApp (sin guardar en BD)

**USA LA OPCIÓN 1 (SOLO LECTURA)** - Es la más simple y segura para tu caso.

---

## 🔍 VERIFICA TU SEGURIDAD

Después de aplicar las reglas, prueba desde tu navegador:

```javascript
// Esto debería funcionar (lectura permitida)
const productos = await getDocs(collection(db, "productos"));
console.log(productos);

// Esto debería FALLAR (escritura prohibida)
await setDoc(doc(db, "productos", "test"), { titulo: "Test" });
// Error: Permission denied
```

---

## 📚 REFERENCIAS

- [Firestore Security Rules Documentation](https://firebase.google.com/docs/firestore/security/start)
- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/basics)

---

## ⚡ RESUMEN RÁPIDO

| Necesidad                 | Opción   | Complejidad     |
| ------------------------- | -------- | --------------- |
| Solo lectura de productos | Opción 1 | ⭐ Fácil        |
| Con usuarios autenticados | Opción 2 | ⭐⭐ Medio      |
| Con panel admin           | Opción 3 | ⭐⭐⭐ Avanzado |

**Para WinerWines: Usa Opción 1** ✅
