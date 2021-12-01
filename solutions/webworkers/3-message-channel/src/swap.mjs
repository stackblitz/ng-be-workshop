export function swap(a, b) {
  return new Promise((resolve) => {
    const aWorker = new Worker('./swap.worker.mjs');
    const bWorker = new Worker('./swap.worker.mjs');

    // create a `MessageChannel` gives back two ports which can be used to communicate with each other
    const { port1, port2 } = new MessageChannel();

    let aValue;
    let bValue;

    function done() {
      if (aValue !== undefined && bValue !== undefined) {
        resolve([aValue, bValue]);
      }
    }

    // listen for messages coming back from the workers
    aWorker.onmessage = (message) => {
      aValue = message.data;

      done();
    };

    bWorker.onmessage = (message) => {
      bValue = message.data;

      done();
    };

    // send one side of the channel together with the value to each worker
    aWorker.postMessage({ value: a, port: port1 }, [port1]);
    bWorker.postMessage({ value: b, port: port2 }, [port2]);
  });
}
