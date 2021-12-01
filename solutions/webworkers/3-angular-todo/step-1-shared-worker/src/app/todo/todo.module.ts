import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';

import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [TodoCreateComponent, TodoListComponent, TodoComponent],
  imports: [BrowserModule],
  exports: [TodoComponent],
  providers: [TodoService],
})
export class TodoModule {}
