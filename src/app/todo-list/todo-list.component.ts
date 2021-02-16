import { Component } from '@angular/core';

import { Todo, todos as fakeData } from './models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  image = 'https://fakeimg.pl/50/';

  todos = fakeData;

  onChildClick(newState: boolean, todo: Todo): void {
    console.log('On a cliqué sur ', { todo, newState });
  }
}
