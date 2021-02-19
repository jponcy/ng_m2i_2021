import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedFormModule } from '../../shared/shared-form.module';
import { FormComponent } from './form.component';
import { TodoListItemComponent } from './todo-list-item.component';

@NgModule({
  declarations: [
    TodoListItemComponent,
    FormComponent
  ],
  exports: [
    TodoListItemComponent
  ],
  imports: [
    CommonModule,
    SharedFormModule
  ]
})
export class TodoListItemModule { }
