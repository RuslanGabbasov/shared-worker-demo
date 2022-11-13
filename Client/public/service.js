const channel = new BroadcastChannel('ws-events');

channel.addEventListener('message', ({data}) => {
    const title = data.type === 'task' ? data.name : data.type === 'table' ? `New data about ${data.name}` : `New detection ${Math.round(data.x * 10E-16) / 100}°, ${Math.round(data.y * 10E-16) / 100}°`;
    self.registration.showNotification(title,
        {
            data,
            icon: `/icons/${data.type}.png`,
            tag: data.type,
            renotify: true,
            requireInteraction: true,
        });
});

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
        const existsTab = clients.find(c => c.url.includes(data.type));
        if (existsTab) {
            await existsTab.focus();
        } else {
            await self.clients.openWindow(`/${data.type}s`);
        }
        console.log('Service worker notification click', event);
    })());
});