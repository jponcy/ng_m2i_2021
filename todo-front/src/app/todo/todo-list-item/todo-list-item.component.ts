import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Todo } from '../models';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent {

  @Input()
  readonly todo: Todo;

  @Output()
  private childClick = new EventEmitter<boolean>();

  editing = false;

  onFinished(event: MouseEvent, todo: Todo): void {
    if (this.todo) {
      todo.finished = !todo.finished;
      this.childClick.emit(todo.finished);
      event.stopPropagation();
    }
  }
}
