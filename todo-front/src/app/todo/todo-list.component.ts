import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Todo } from './models';
import { TodoApiService } from './services';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: []
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos: Todo[];

  printingFinished = true;

  /** Used to free observables. */
  protected subscriptionHandler$ = new Subject();

  constructor(private readonly api: TodoApiService) {}

  ngOnInit(): void {
    this.api.getAll()
        .pipe(takeUntil(this.subscriptionHandler$))
        .subscribe(todos => this.todos = todos);
  }

  ngOnDestroy(): void {
    this.subscriptionHandler$.next();
    this.subscriptionHandler$.complete();
  }

  onChildClick(newState: boolean, todo: Todo): void {
    console.log('On a cliqué sur ', { todo, newState });
  }
}
