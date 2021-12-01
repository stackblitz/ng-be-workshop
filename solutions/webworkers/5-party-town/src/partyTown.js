const types = {
  google_analytics: `
  (function () {
    // I'm a library built to work the main thread and
    // am consuming way more resources then I should.
    console.log('Inside the script', document.location);
  })();`,
};

let sab;
let int32;
let int8;

/**
 * By assigning the document to the global worker scope, it will be
 * available when the script is `eval`'d
 */
self.document = new Proxy(
  {},
  {
    get: function (target, prop, receiver) {
      // Send to the main thread which property we want
      self.postMessage(prop);

      // Sleep this worker until a value is written in the SAB
      Atomics.wait(int32, 0, 0);

      // Get the data
      const data = int8.slice(4, 1000).filter((x) => x !== 0);

      return new TextDecoder().decode(data);
    },
  }
);

self.onmessage = ({ data }) => {
  if (data.type) {
    evalSourceCode(types[data.type]);
  }

  if (data.sab) {
    sab = data.sab;
    int32 = new Int32Array(sab);
    int8 = new Uint8Array(sab);
  }
};

function evalSourceCode(code) {
  eval(code);
}
