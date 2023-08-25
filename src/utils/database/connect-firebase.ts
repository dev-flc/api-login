import dotenv from 'dotenv'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

dotenv.config()

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} = process.env

const firebaseConfig = {
  apiKey: API_KEY,
  appId: APP_ID,
  authDomain: AUTH_DOMAIN,
  messagingSenderId: MESSAGING_SENDER_ID,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig)

// Obtiene una instancia de Firestore
const connectDB = getFirestore(app)
export { connectDB }
