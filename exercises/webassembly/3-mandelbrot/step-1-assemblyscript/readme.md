# Mandelbrot

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/stackblitz/ng-be-workshop/tree/main/exercises/webassembly/3-mandelbrot/step-1-assemblyscript?file=src%2Findex.html)


## Exercise

Currently, the Mandelbrot implementation is done through JavaScript inside a worker. The first step in this exercise
is to convert `mandelbrot.mjs` to AssemblyScript inside `mandelbrot.ts`.

> **hint**: The types you need are `u32`, `i32`, `f64`, and `bool`.

After Mandelbrot has been converted to AssemblyScript, you will need to refactor the [worker](./src/worker.mjs). The
worker now has to instantiate the WebAssembly binary instead by using the [AssemblyScript loader](https://www.assemblyscript.org/loader.html#installation).
