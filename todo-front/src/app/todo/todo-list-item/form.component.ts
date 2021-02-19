import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Todo } from '../models';
import { TodoApiService } from './../services/todo-api.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent {

  form = this.fb.group({
    label: ['', Validators.required],
    finished: [
      false,
      (control: FormControl) => control.value === false ? null : { shouldBeFalse: true }
    ]
  });

  @Output()
  update = new EventEmitter<Todo>();

  private id: number;

  @Input()
  set todo(todo: Todo|null) {
    // this.form.patchValue(todo);
    // this.loading = true;

    if (todo) {
      this.form.reset(todo);
      this.id = todo.id;
    } else {
      this.form.reset();
      this.id = null;
    }

    // this.loading = false;
  }

  loading = false;

  constructor(private readonly api: TodoApiService, private readonly fb: FormBuilder) { }

  onSubmit(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    // const dto = this.dto;

    if (this.form.valid) {
      this.loading = true;
      this.api
          .save({...this.form.value, id: this.id })
          .subscribe(todo => this.update.emit(todo))
          .add(() => this.loading = false);
    }
  }

  get label(): AbstractControl {
    return this.form.controls.label;
  }

  // private get dto(): Todo {
  //   const result: any = this.form.value;

  //   result.finished = false;

  //   return result as Todo;
  // }

}
