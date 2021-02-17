import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { map, reduce, takeUntil, tap } from 'rxjs/operators';

import { Todo } from './models';
import { TodoApiService } from './todo-api.service';

class Toto {
  constructor(private lastname: string, private firstname: string) {}

  hello() {
    console.log(`Bonjour ${this.firstname} ${this.lastname}`);
  }
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  image = 'https://fakeimg.pl/50/';

  todos: Todo[];

  printingFinished = true;

  /** Used to free observables. */
  protected subscriptionHandler$ = new Subject();

  // Injection sans utilise de property
  // private api: TodoApiService;
  // constructor(api: TodoApiService) {
  //   this.api = api;
  // }

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
