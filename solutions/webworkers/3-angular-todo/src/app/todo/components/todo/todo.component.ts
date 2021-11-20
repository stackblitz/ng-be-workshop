import { Component } from '@angular/core';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  todos$ = this.todoService.todos$;

  constructor(private todoService: TodoService) {}

  addTodo(value: string) {
    console.log('Added', value);
    this.todoService.addTodo(value);
  }

  removeTodo(id: string) {
    this.todoService.removeTodo(id);
  }
}
