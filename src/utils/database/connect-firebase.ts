import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBIcM_ygBfFE_9WCJJ2LgNI7h28crA1Z50',
  authDomain: 'dashboard-b4000.firebaseapp.com',
  projectId: 'dashboard-b4000',
  storageBucket: 'dashboard-b4000.appspot.com',
  messagingSenderId: '566281416096',
  appId: '1:566281416096:web:76b631f3b753a46b7908c5'
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig)

// Obtiene una instancia de Firestore
const firestore = getFirestore(app)
export { firestore }
