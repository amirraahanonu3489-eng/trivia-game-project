import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient , withFetch } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyASXNVfgfuAgLyeuJCeUmvZYYYyDPdnURU",
  authDomain: "trivia-game-da375.firebaseapp.com",
  projectId: "trivia-game-da375",
  storageBucket: "trivia-game-da375.firebasestorage.app",
  messagingSenderId: "93168343956",
  appId: "1:93168343956:web:d32295fa9431b0c2ffcd81",
  measurementId: "G-8M077KMXDQ"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};