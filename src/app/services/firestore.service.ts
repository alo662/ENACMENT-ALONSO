import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { collection, addDoc, getFirestore, Firestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore: Firestore | null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Solo inicializamos Firestore si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.firestore = getFirestore();
    } else {
      // En el servidor, dejamos firestore en null para evitar errores
      this.firestore = null;
    }
  }

  async addData(collectionName: string, data: any): Promise<void> {
    if (!this.firestore) {
      console.warn('Firestore no está disponible en el servidor.');
      return;
    }
    try {
      const ref = collection(this.firestore, collectionName);
      await addDoc(ref, data);
      console.log('Documento agregado con éxito');
    } catch (error) {
      console.error('Error al agregar documento:', error);
    }
  }
}
