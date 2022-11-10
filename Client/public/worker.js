self.onconnect = (e) => {
    const port = e.ports[0];

    port.addEventListener('message', (e) => {
        const workerResult = `Result: ${e.data[0] * e.data[1]}`;
        port.postMessage(workerResult);
    });

    port.start();
}