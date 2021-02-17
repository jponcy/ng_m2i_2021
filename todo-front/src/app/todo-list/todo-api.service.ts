import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';

import { Todo, TodoDto } from './models';
import { TagsApiService } from './tags-api.service';
import { map } from 'rxjs/operators';

const URL = `${environment.apiUrl}/todos`;

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private readonly http: HttpClient, private readonly tagApi: TagsApiService) {}

  getAll(): Observable<Todo[]> {
    return zip(this.http.get<TodoDto[]>(URL), this.tagApi.getAll())
        .pipe(
          map(([todos, tags]) => todos.map(todo => ({
            ...todo,
            tags: tags.filter(t => todo.tags.includes(t.id))
          })))
        );
  }
}
