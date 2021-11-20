let stopWorker;

export function fibonacci(position) {
  return new Promise((resolve) => {
    if (typeof Worker === 'undefined') {
      throw new Error('WebWorkers are not supported...');
    }

    // stop the previous worker
    stopWorker?.();

    const worker = new Worker('./fibonacci.worker.mjs', {
      name: `Fibonacci Worker (${position})`,
      type: 'module',
    });

    stopWorker = (value) => {
      // terminate the worker
      worker.terminate();

      // resolve with the provided value
      resolve(value);

      stopWorker = undefined;
    };

    worker.onmessage = (message) => {
      stopWorker(message.data);
    };

    worker.postMessage(position);
  });
}
