import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'todo-create',
  templateUrl: './todo-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateComponent {
  @Output() todo = new EventEmitter<string>();

  onAdd(value: string) {
    this.todo.emit(value);
  }
}
