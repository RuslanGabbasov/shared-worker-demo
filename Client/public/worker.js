const socket = new WebSocket(location.host === 'localhost' ? 'ws://localhost:3000/ws' : `wss://${location.host}/ws`);
const connectedPorts = new Set();
const channel = new BroadcastChannel('ws-events');
const receivedData = [];

socket.addEventListener('open', () => {
    const data = JSON.stringify({
        "time": Date.now(),
        "client": Math.random().toString(36).substring(7),
    });

    socket.send(data);
    console.log('Opened connection');
});

socket.addEventListener('message', ({ data }) => {
    try {
        const payload = JSON.parse(data);
        receivedData.push(payload);
        connectedPorts.forEach(port => port.postMessage(payload));
        channel.postMessage(payload);
    } catch (e) {
        console.log(e);
    }
});

self.onconnect = (e) => {
    const port = e.ports[0];
    connectedPorts.add(port);

    // WARN: Так сделано только для демо, в реальном решении надо сделать отдельный метод для получения данных на текущий момент в открытой вкладке
    receivedData.forEach(data => port.postMessage(data));

    port.addEventListener('message', (e) => {
        const { action, value } = e.data || {};

        switch (action) {
            case 'send': socket.send(JSON.stringify(value)); break;
            case 'unload': connectedPorts.delete(port); break;
        }
    });

    port.start();
}