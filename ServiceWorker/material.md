Service worker:
https://web.dev/articles/service-worker-lifecycle
https://developer.chrome.com/docs/workbox/service-worker-lifecycle
https://developer.chrome.com/docs/workbox/what-is-workbox
如果有多个tab页面，访问新的同一个scope的页面会导致sw刷新，也可以手动刷新reg.update，注意刷新不等于activate和控制页面，可能只是install。
如果要控制页面，需要在sw的install event里面 self.skipWaiting()
Sw 当前只能有一个activate，可能有一个处于wait状态
可以用ServiceWorkerRegistration获取当前处于active和waiting状态的sw