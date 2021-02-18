import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TodoListItemModule } from './todo-list-item/todo-list-item.module';
import { TodoListComponent } from './todo-list.component';

@NgModule({
  declarations: [
    TodoListComponent
  ],
  exports: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    TodoListItemModule
  ]
})
export class TodoModule { }
