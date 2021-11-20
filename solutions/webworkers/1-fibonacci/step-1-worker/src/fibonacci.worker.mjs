function fibonacci(position) {
  if (position < 2) {
    return position;
  }

  return fibonacci(position - 1) + fibonacci(position - 2);
}

self.onmessage = (message) => {
  console.log(`Calculate fibonacci(${message.data})`);

  self.postMessage(fibonacci(message.data));
};
