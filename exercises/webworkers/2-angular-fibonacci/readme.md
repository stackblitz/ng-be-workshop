# Angular Fibonacci

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/stackblitz/ng-be-workshop/tree/main/exercises/webworkers/2-angular-fibonacci?file=src%2Fapp%2Ffibonacci%2Ffibonacci.component.ts)

This projects implements the same fibonacci UI as the the first project but using Angular instead.

## Exercise

### Exercise 1

Use the [Angular CLI](https://angular.io/guide/web-worker) to add a fibonacci worker to the project and move the 
logic off of the main thread. In case `Worker` is not availabe, fallback using the sychronous blocking implementation.

### Exercise 2

Now that we have our logic off of the main thread, refactor it using [`Comlink`](https://github.com/GoogleChromeLabs/comlink).
