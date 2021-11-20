import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { TodoAction, createTodo, removeTodo } from '../actions';
import { Todo } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = JSON.parse(localStorage.getItem('todolist') || '[]');

  todos$ = new BehaviorSubject<Todo[]>(this.todos);

  addTodo(todo: string) {
    const action = createTodo(uuidv4(), todo);

    this.handleAction(action);
  }

  removeTodo(id: string) {
    const action = removeTodo(id);

    this.handleAction(action);
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
