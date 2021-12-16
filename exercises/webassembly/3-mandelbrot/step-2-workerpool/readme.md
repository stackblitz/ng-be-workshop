# Mandelbrot Worker Pool

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/stackblitz/ng-be-workshop/tree/main/exercises/webassembly/3-mandelbrot/step-2-workerpool?file=src%2Findex.html)


## Exercise

Using multiple workers, we can divide the work that has to be done and parallelize the calculations.

The idea of this exercise is to refactor what you now have, to using multiple workers. We do this by dividing the image
into multiple regions of work. The easiest approach is to divide the height of the image by the number of workers we
want to use. 

For example, if we want to use 3 workers on an image of 900 pixels in height, every worker processes 300 pixels.

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│                                                                    │
│                              Worker 1                              │
│                                                                    │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                                                                    │
│                              Worker 2                              │
│                                                                    │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                                                                    │
│                              Worker 3                              │
│                                                                    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

After every worker is finished processing, we can stitch the result together and render the image.

The first thing you will have to refactor is the fact that the worker has to know which region it has to calculate.
Therefore, the worker needs to receive the `start` and `end` row of the block it needs to process. The logic inside the
[worker](./src/worker.mjs) has to be updated as well. The `Uint8Array` only needs to be as big as the region it needs to
process, and the loop should only loop over that same region. The Mandelbrot algorithm itself does not need to change.

After this step, if you set the number of threads to 2, you should only see half of the image being calculated. The
reason off course is that right now we don't spin up multiple workers dynamically yet. So let's fix that!

To fix this problem, you will have to implement a [worker pool](./src/worker-pool.mjs). The worker pool returns the
number of workers requested, and creates additional workers if needed.

The last step to make this work is to refactor the `run` method in [index.mjs](./src/index.mjs).
1. Retrieve the workers from the worker pool
2. Calculate the number of rows each worker has to process
3. Let each worker calculate the pixels in the correct region
4. Iterate over the result and copy the `Uint8Array` of every worker into one single `Uint8Array` at the correct offset.
You can use [`Uint8Array.set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set)
for that.
