const connections = [];

self.onconnect = (event) => {
  const port = event.ports[0];

  connections.push(port);

  port.onmessage = (message) => {
    for (const connection of connections) {
      if (connection !== port) {
        connection.postMessage(message.data);
      }
    }
  };
};
