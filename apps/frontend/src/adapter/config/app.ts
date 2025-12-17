import { getApps, initializeApp, FirebaseApp } from 'firebase/app'

const app: FirebaseApp = getApps().length
    ? getApps()[0]!
    : initializeApp({
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })

export { app }
