self.addEventListener('activate', (event) => {
    console.log("Service worker activated");
    event.waitUntil((async () => {
        try {
            await Notification.requestPermission();
        } catch (error) {
            console.error(`Request notification permission failed with ${error}`);
        }
    })());
});

self.addEventListener('install', (event) => {
    console.log("Service worker installed");
});

self.addEventListener('fetch', async (event) => {
    event.respondWith(
        await fetch(event.request)
    );
});

self.addEventListener('message', async (event) => {
    console.log("Service worker message", event);
});

self.addEventListener('notificationclick', function(event) {
    const data = event.notification.data;
    event.notification.close();

    event.waitUntil((async () => {
        const clients = await self.clients.matchAll({includeUncontrolled: false});
        await clients.find(c => c.url.includes(data.type))?.focus();
        console.log('Service worker notification click', event);
    })());
});