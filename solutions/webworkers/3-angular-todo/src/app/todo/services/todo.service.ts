import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { TodoAction, createTodo, removeTodo } from '../actions';
import { Todo } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private syncWorker?: SharedWorker;
  private todos: Todo[] = JSON.parse(localStorage.getItem('todolist') || '[]');

  todos$ = new BehaviorSubject<Todo[]>(this.todos);

  constructor(private ngZone: NgZone) {
    if (typeof SharedWorker !== 'undefined') {
      this.syncWorker = new SharedWorker('assets/sync.worker.mjs', {
        type: 'module',
      });

      this.syncWorker.port.onmessage = (message: { data: TodoAction }) => {
        this.ngZone.run(() => {
          this.handleAction(message.data);
        });
      };
    }
  }

  addTodo(todo: string) {
    const action = createTodo(uuidv4(), todo);

    this.handleAction(action);

    this.syncWorker?.port.postMessage(action);
  }

  removeTodo(id: string) {
    const action = removeTodo(id);

    this.handleAction(action);

    this.syncWorker?.port.postMessage(action);
  }

  private handleAction(message: TodoAction) {
    switch (message.type) {
      case 'ADD': {
        this.todos = [...this.todos, { id: message.id, todo: message.todo }];

        break;
      }
      case 'REMOVE': {
        this.todos = this.todos.filter(({ id }) => id !== message.id);
      }
    }

    localStorage.setItem('todolist', JSON.stringify(this.todos));

    this.todos$.next(this.todos);
  }
}
