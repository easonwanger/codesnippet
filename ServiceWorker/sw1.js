const version="17"
self.addEventListener("fetch", function(event) {
  console.log(`fetch event ${version}`, event);

  event.respondWith(
    fetch(event.request).then(function(response) {
      console.log(`fetch response ${version}`, response);
      return response;
    })
  );
})

self.addEventListener("message", (event) => {
    console.log("Service Worker received message: " + event.data+" "+version);
    // self.clients.claim()
  });

self.addEventListener("push", function(event) {
    console.log("Service Worker push event: " + event.data.text()+" "+version);

  }
)  
  // 监听 Web 页面发送的消息
self.addEventListener("message", (event) => {
  if (event.data.type === "SKIP_WAITING") {
    console.log("收到 SKIP_WAITING 消息，立即激活新 Service Worker");
    self.skipWaiting();
  }
});

self.addEventListener("install", (event) => {
    console.log("Service Worker installing..."+version);
    // self.skipWaiting(); // 立即激活新 Service Worker
  });
self.addEventListener('activate', function(event) {
    // event.waitUntil(self.clients.claim());

    console.log('activate event '+version, event);
    // event.waitUntil(clients.claim());
  });