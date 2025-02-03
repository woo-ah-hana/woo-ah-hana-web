// /public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const config = {
  apiKey: 'AIzaSyC60aSq7JI6m3i6Atiad-OfVXi6HTDd5iw',
  authDomain: 'wooahhana.firebaseapp.com',
  projectId: 'wooahhana',
  storageBucket: 'wooahhana.firebasestorage.app',
  messagingSenderId: '852689356963',
  appId: '1:852689356963:web:2e5700e183cca92b7f9716',
};
// Initialize Firebase
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
