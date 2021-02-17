import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from './models';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/todos');
  }
}
