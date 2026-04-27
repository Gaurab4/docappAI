import { initializeApp, getApps } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

function readConfig() {
  const env = import.meta.env
  return {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  }
}

function isConfigured(c: ReturnType<typeof readConfig>): boolean {
  return Boolean(
    c.apiKey &&
      c.authDomain &&
      c.projectId &&
      c.storageBucket &&
      c.messagingSenderId &&
      c.appId
  )
}

const config = readConfig()
export const firebaseConfigured = isConfigured(config)

export let auth: Auth | null = null

if (firebaseConfigured) {
  const existing = getApps()[0]
  const app = existing ?? initializeApp(config)
  auth = getAuth(app)
}
