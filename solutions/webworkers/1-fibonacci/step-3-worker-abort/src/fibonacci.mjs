const worker = new Worker('./fibonacci.worker.mjs', {
  name: 'Fibonacci Worker',
  type: 'module',
});

let abortController;

export function fibonacci(position) {
  // abort the previous execution if it exists
  abortController?.abort();

  return new Promise((resolve) => {
    if (typeof Worker === 'undefined') {
      throw new Error('WebWorkers are not supported...');
    }

    // create a new "abort controller" that will resolve the promise with `undefined` when aborted
    abortController = createAbortController(resolve);

    worker.onmessage = (message) => {
      resolve(message.data);
    };

    worker.postMessage({
      value: position,
      abortSignal: abortController.signal,
    });
  });
}

function createAbortController(resolve) {
  const sab = new SharedArrayBuffer(1);
  const abortSignal = new Uint8Array(sab);

  return {
    signal: sab,
    abort() {
      abortSignal[0] = 1;

      resolve();
    },
  };
}
