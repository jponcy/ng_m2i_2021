import { Component, OnInit } from '@angular/core';
import { todos as fakeData } from './models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  image = 'https://fakeimg.pl/50/';

  todos = fakeData;

  constructor() { }

  ngOnInit(): void {
  }

}
