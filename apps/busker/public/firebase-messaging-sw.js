importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: "AIzaSyC7_krgq5nWRQYziI1y9wPgiFZgeZ9Xre4",
  authDomain: "vybz-d13fa.firebaseapp.com",
  projectId: "vybz-d13fa",
  storageBucket: "vybz-d13fa.appspot.com",
  messagingSenderId: "629726093055",
  appId: "1:629726093055:web:de821cc98b1fd296b376ca",
  measurementId: "G-9B25C0KFY6"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// 백그라운드 메시지 수신 핸들러
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  const notificationTitle = payload.notification?.title || payload.data?.title;
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body,
    icon: '/vybz_icon_192.png',
  };

  if (notificationTitle) {
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
}); 