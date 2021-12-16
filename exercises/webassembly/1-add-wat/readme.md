# Add WAT

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/stackblitz/ng-be-workshop/tree/main/exercises/webassembly/1-add-wat?file=src%2Fadd.wat)


## Exercise

Implement a function that takes two numbers and returns the sum of those numbers by using the
[WebAssembly text format](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format).

You can compile the `add.wat` file by running

```
$ npm run build
```

Refactor [index.mjs](./src/index.mjs) to load that WASM binary and use WebAssembly to calculate the outcome.

> **Note**: The WASM binary file is invisible in StackBlitz as it's compiled to a `.dist` directory and thus hidden
for the user. The reason is that in order to use binary files on StackBlitz, you need a pro account.
