import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export const getProducts = async () => {
  try {
    const productsCollection = collection(db, 'productos');
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return [];
  }
};
