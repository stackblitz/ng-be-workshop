# Party town starter

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/stackblitz/ng-be-workshop/tree/main/exercises/webworkers/4-party-town?file=src%2Findex.html)

This example mimics the way the party town library works.

## Exercise

Implement the following steps in the party town library.

1. Create the `SharedArrayBuffer` and `Int32Array` on the main thread.
2. When the main thread receives a message, get the corresponding value from the `document` send, encodes it and store it in the SAB.
3. Make sure the Worker gets unlocked when the data is written.
4. When the worker receives the `SharedArrayBuffer`, create the `TypedArray` for it.
5. Make the worker sleep when a property of the `document` is requested.

### Bonus Exercise

Adapt the SAB to follow the data structure described below. This means that writing and reading the actual data would use a `Uint8Array`.

The following data structure makes sure that 

<!-- * +-----------------------------------
 * |                                        |
 * |  |- RESERVED BYTES  |- VARIABLE ----|  |
 * |                                        |
 * |  LOCK               DATA               |
 * |  +---------------+  +---------------+  |
 * |  | Int32Array    |  | Uint8Array    |  |
 * |  +---------------+  +---------------+  |
 * |                                        |
 * |  < - 4 Bytes --- >  <- N Bytes ---- >  |
 * |                                        |
 * +---------------------------------------->
