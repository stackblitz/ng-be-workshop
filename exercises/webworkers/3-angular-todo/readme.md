# Angular ToDo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/stackblitz/ng-be-workshop/tree/main/exercises/webworkers/3-angular-todo?file=README.md)

After starting the application, you will see that you can add items to a ToDo list, and remove them by clicking
on the item itself. The state is stored in `LocalStorage`, so after refreshing the page, the ToDo items should
still be visible.

## Excercise

A [`SharedWorker`](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker) allows us to communicate with other
browser tabs or browser windows.

Add a `SharedWorker` to the `TodoService` so that the ToDo list is synchronized with other open browser windows.

**Tip**: Do not send the entire list of items through the worker.
