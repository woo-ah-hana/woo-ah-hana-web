'use client'

import React, { useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, onMessage, getToken, Messaging } from 'firebase/messaging'

const NotificationIndex = ():React.JSX.Element => {
  const onMessageFCM = async (): Promise<void> => {
    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return

      const config = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_APP_ID,
      };
      
      const firebaseApp = initializeApp(config)

      const messaging: Messaging = getMessaging(firebaseApp)

      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      const currentToken = await getToken(messaging, { vapidKey })

      if (currentToken) {
        console.log(currentToken)
      } else {
        console.log('No registration token available. Request permission to generate one.')
      }

      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload)
      })
    } catch (err) {
      console.error('An error occurred while handling FCM messaging:', err)
    }
  }

  useEffect(() => {
    onMessageFCM()
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default NotificationIndex
