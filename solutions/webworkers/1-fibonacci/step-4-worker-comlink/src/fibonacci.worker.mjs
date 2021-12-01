import * as Comlink from 'https://unpkg.com/comlink/dist/esm/comlink.mjs';

function fibonacci(position, abortSignal) {
  if (abortSignal[0] === 1) {
    // break out of calculation if the abort signal is set to 1
    throw new Error('Aborted');
  }

  if (position < 2) {
    return position;
  }

  return (
    fibonacci(position - 1, abortSignal) + fibonacci(position - 2, abortSignal)
  );
}

Comlink.expose(function (value, abort) {
  // create a Uint8Array out of the SAB
  const abortSignal = new Uint8Array(abort);

  try {
    return fibonacci(value, abortSignal);
  } catch {
    // do nothing
  }
});
