importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
  messagingSenderId: '901639143723'
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  console.log(
    '[firebase-messaging-sw.js NOIS3] Received background message ',
    payload
  );
  const { title, body, link, actionTitle, emoji, img } = payload.data;
  const notificationTitle = emoji ? title + String.fromCodePoint(emoji) : title;
  const notificationOptions = {
    body,
    icon: img,
    actions: [
      {
        action: link,
        title: actionTitle
      }
    ]
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.action));
});
