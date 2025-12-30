import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

// Reintentos exponenciales para mejorar fiabilidad
const retryAsync = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    console.warn(`Reintentando en ${delay}ms... (${retries} intentos restantes)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryAsync(fn, retries - 1, delay * 2);
  }
};

export const getProducts = async () => {
  try {
    // Implementar timeout de 15 segundos
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout cargando productos')), 15000)
    );

    const fetchPromise = retryAsync(async () => {
      const productsCollection = collection(db, 'productos');
      const snapshot = await getDocs(productsCollection);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });

    return await Promise.race([fetchPromise, timeoutPromise]);
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    // Retornar array vacío en lugar de lanzar error
    return [];
  }
};

