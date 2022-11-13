import {globalState} from "./state";

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
    try {
        await Notification.requestPermission();
    } catch (error) {
        console.error(`Request notification permission faild with ${error}`);
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
    if (location.href.includes(data.type)) {
        document.title = data.type === 'task' ? data.name : data.type === 'table'
            ? `New data about ${data.name}`
            : `New detection ${Math.round(data.x * 10E-16) / 100}°, ${Math.round(data.y * 10E-16) / 100}°`;
    }
    console.log(data);
    switch (data.type) {
        case 'task':
            globalState.set((state) => ({...state, tasks: [...state.tasks, data]}));
            break;
        case 'graph':
            globalState.set((state) => ({...state, graphs: [...state.graphs, data]}));
            break;
        case 'table':
            globalState.set((state) => ({...state, tables: [...state.tables, data]}));
            break;
    }
});

webSocketWorker.port.start();

window.addEventListener('beforeunload', () => {
    webSocketWorker.port.postMessage({
        action: 'unload',
        value: null,
    });

    webSocketWorker.port.close();
});