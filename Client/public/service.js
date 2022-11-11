self.addEventListener('activate', (event) => {
    console.log("Service worker activated");
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
    event.waitUntil((async () => {
        const clients = await self.clients.matchAll({includeUncontrolled: true});
        console.log(clients);
        // TODO: it's possible only for user activation!
        clients.find(c => c.visibilityState === 'hidden')?.focus();

        console.log('sw', event);
    })());
});