import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TodoListItemComponent } from './todo-list-item.component';

@NgModule({
  declarations: [
    TodoListItemComponent
  ],
  exports: [
    TodoListItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TodoListItemModule { }
