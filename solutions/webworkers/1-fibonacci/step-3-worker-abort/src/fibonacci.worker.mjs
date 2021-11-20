function fibonacci(position, abortSignal) {
  if (Atomics.load(abortSignal, 0) === 1) {
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

self.onmessage = (message) => {
  const { value, abortSignal } = message.data;

  // create a Uint8Array out of the SAB
  const abortSignalArray = new Uint8Array(abortSignal);

  try {
    const result = fibonacci(value, abortSignalArray);

    self.postMessage(result);
  } catch {
    // we don't have to do anything when it's aborted
  }
};
