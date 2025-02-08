// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './app/firebaseConfig';

bootstrapApplication(AppComponent, {
  providers: [
    // Inicializa Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // Configura Firestore para la inyección
    provideFirestore(() => getFirestore())
  ]
});
