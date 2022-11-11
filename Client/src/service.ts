(async (): Promise<void> => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/service.js", {
                scope: "/",
            });
            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active");
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
})();

const webSocketWorker = new SharedWorker('/worker.js');

const sendMessageToSocket = (message: any) => {
    webSocketWorker.port.postMessage({
        action: 'send',
        value: message,
    });
};

webSocketWorker.port.addEventListener('message', ({ data }) => {
    navigator.serviceWorker.controller?.postMessage({data});
    console.log(data);
});

webSocketWorker.port.start();

window.addEventListener('beforeunload', () => {
    webSocketWorker.port.postMessage({
        action: 'unload',
        value: null,
    });

    webSocketWorker.port.close();
});