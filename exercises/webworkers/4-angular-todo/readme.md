# Angular ToDo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/stackblitz/ng-be-workshop/tree/main/exercises/webworkers/4-angular-todo?file=README.md)

After starting the application, you will see that you can add items to a ToDo list, and remove them by clicking
on the item itself. The state is stored in `LocalStorage`, so after refreshing the page, the ToDo items should
still be visible.

## Exercise

**Tip**: The `onmessage` handlers run outside the Angular zone!

### Exercise 1

A [`SharedWorker`](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker) allows us to communicate with other
browser tabs or browser windows.

Add a `SharedWorker` to the `TodoService` so that the ToDo list is synchronized with other open browser windows.

**Tip**: Do not send the entire list of items through the worker.

### Exercise 2

If we just have to proxy all the messages from one browser context to all other browser contexts, it's better to use a [`BroadcastChannel`](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel).

Fork your StackBlitz project and refactor the `SharedWorker` implementation to using a `BroadcastChannel`.
