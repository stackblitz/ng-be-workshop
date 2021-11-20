# Fibonacci Starter

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/stackblitz/ng-be-workshop/tree/main/exercises/webworkers/2-message-channel?file=src%2Findex.html)

This example calculates the n-th [fibonacci](https://en.wikipedia.org/wiki/Fibonacci_number) number.

> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, ...

For example, if you provide the number 10, the result will be 55.

## Excercise

### Excercise 1

The starter exercise calculates the fibonacci number on the main thread. Refactor this exercise to calculate the
fibonacci number in a Web Worker.


### Excercise 2

Currently, if we calculate the fibonacci number, we can't cancel it and calculate a new one. The reason is that
the running Web Worker is blocked by the current calculation. In order to fix this we can check if we have a
running Web Worker and terminate it first. Then create a new worker and calculate the new fibonacci number.


### Excercise 3

Always creating a new worker comes with some overhead. It would be better if we could cancel the current worker and
re-use it to calculate the new fibonacci number.

In order to do this, we can use a [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)
to cancel the fibonacci loop. If the loop is cancelled, the same worker can accept new work that can be processed.

**Note**: Think about cross-site isolation! Headers have to be added to the top-level page. This can be done via the
`browsersync.config.js` file. Also make sure to open the website in a separate browser window. Setting these headers
currently doesn't work inside StackBlitz.

<details>
  <summary>browsersync.config.js</summary>

```js
module.exports = {
  files: ['./src/**/*.{html,js,mjs}'],
  server: {
    baseDir: './src',
  },
  middleware: [
    function (_req, res, next) {
      // these headers are required to put the page in cross-origin isolation mode
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

      next();
    },
  ],
};
```
</details>


### Excercise 4

Using `postMessage` and `onmessage` to communicate with workers often doesn't feel very developer friendly. To make
this more enjoyable, we can use [`Comlink`](https://github.com/GoogleChromeLabs/comlink).

Refactor the previous solution by using `Comlink`.
