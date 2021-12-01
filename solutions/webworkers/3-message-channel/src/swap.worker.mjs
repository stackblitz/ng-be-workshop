self.onmessage = ({ data: { value, port } }) => {
  port.onmessage = (message) => {
    // if we receive something from the other end, send it back to the main thread
    self.postMessage(message.data);
  };

  // send the value to the other end of the port
  port.postMessage(value);
};
