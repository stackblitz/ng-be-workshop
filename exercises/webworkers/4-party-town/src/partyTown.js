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

      // Sleep the worker

      // Get the data and decode it and return the result

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
