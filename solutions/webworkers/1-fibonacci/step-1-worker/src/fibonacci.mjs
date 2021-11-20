const worker = new Worker('./fibonacci.worker.mjs', {
  name: 'Fibonacci Worker',
  type: 'module',
});

export function fibonacci(position) {
  return new Promise((resolve) => {
    if (typeof Worker === 'undefined') {
      throw new Error('WebWorkers are not supported...');
    }

    worker.onmessage = (message) => {
      resolve(message.data);
    };

    worker.postMessage(position);
  });
}
