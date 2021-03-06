import * as Comlink from 'https://unpkg.com/comlink/dist/esm/comlink.mjs';

const worker = new Worker('./fibonacci.worker.mjs', {
  name: 'Fibonacci Worker',
  type: 'module',
});

const calculate = Comlink.wrap(worker);

let abortController;

export async function fibonacci(position) {
  if (typeof Worker === 'undefined') {
    throw new Error('WebWorkers are not supported...');
  }

  // abort the previous execution if it exists
  abortController?.abort();

  // create a new "abort controller"
  abortController = createAbortController();

  return calculate(position, abortController.signal);
}

function createAbortController() {
  const sab = new SharedArrayBuffer(1);
  const abortSignal = new Uint8Array(sab);

  return {
    signal: sab,
    abort() {
      abortSignal[0] = 1;
    },
  };
}
