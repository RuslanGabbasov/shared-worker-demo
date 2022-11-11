const socket = new WebSocket('ws://localhost:8080/ws');
const connectedPorts = new Set();

socket.addEventListener('open', () => {
    const data = JSON.stringify({
        "time": 123456,
        "channel": "futures.tickers",
        "event": "subscribe",
        "payload": ["test"]
    });

    socket.send(data);
});

socket.addEventListener('message', ({ data }) => {
    try {
        const payload = JSON.parse(data);
        connectedPorts.forEach(port => port.postMessage(payload));
    } catch (e) {
        console.log(e);
    }
});

socket.addEventListener('open', (event) => {
    console.log('Opened connection');
});

self.onconnect = (e) => {
    const port = e.ports[0];
    connectedPorts.add(port);

    port.addEventListener('message', (e) => {
        const { action, value } = e.data || {};

        switch (action) {
            case 'send': socket.send(JSON.stringify(value)); break;
            case 'unload': {
                connectedPorts.delete(port);
            }
        }
    });

    port.start();
}