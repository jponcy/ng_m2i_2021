import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { map, reduce, tap } from 'rxjs/operators';

import { Todo } from './models';
import { TodoApiService } from './todo-api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  image = 'https://fakeimg.pl/50/';

  todos: Todo[];

  printingFinished = true;

  private subcription: Subscription;

  ngOnInit(): void {
    const api = new TodoApiService();

    this.subcription = api.observable.subscribe(todos => this.todos = todos);

    of(1, 2, 4, 3)
        .pipe(
          tap(console.log),
          map(v => v ** 2),
          tap(v => console.log(v)),
          reduce((acc, e) => acc + e),
          map(v => `Computed: ${v}`),
          tap(console.log)
        )
        .subscribe(() => {});

    of({ lastname: 'Dupont', firstname: 'Jean', id: 52 })
        .pipe(
          map(u => ({ name: u.firstname.toLowerCase() + ' ' + u.lastname.toUpperCase(), id: u.id }))
        )
        .subscribe(console.log);
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  onChildClick(newState: boolean, todo: Todo): void {
    console.log('On a cliqué sur ', { todo, newState });
  }
}
