import { initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";

export const generateFCMToken = async ():Promise<string>=>{
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return "none";

  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_APP_ID,
  };

  const firebaseApp = initializeApp(config);

  const messaging: Messaging = getMessaging(firebaseApp)
  
  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
  const currentToken = await getToken(messaging, { vapidKey });

  return currentToken;
}