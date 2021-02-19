import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo, TodoDto } from '../models';
import { environment } from './../../../environments/environment';
import { TagsApiService } from './tags-api.service';

const URL = `${environment.apiUrl}/todos`;

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private readonly http: HttpClient, private readonly tagApi: TagsApiService) {}

  getAll(): Observable<Todo[]> {
    return zip(this.http.get<TodoDto[]>(URL), this.tagApi.getAll())
        .pipe(
          map(([todos, tags]) => todos.map(({finished_at: finishedAt, ...todo}) => ({
            ...todo,
            finished: !!finishedAt, // finishedAt !== null,
            tags: tags.filter(t => (todo.tags || []).includes(t.id))
          })))
        );
  }

  save(todo: Todo): Observable<Todo> {
    let request: Observable<TodoDto>;

    if (todo.id) {
      request = this.http.put<TodoDto>(`${URL}/${todo.id}`, todo);
    } else {
      request = this.http.post<TodoDto>(URL, todo);
    }

    return request.pipe(map(t => t as unknown as Todo)); // TODO: Convert
  }
}

// console.log(+!!(3 + 2) * 4 & 3)
// console.log(+!!5 * 4 & 3)
// console.log(+(true) * 4 & 3)
// console.log(1 * 4 & 3)
// console.log(4 & 3)

// 0001
// 0010
// 0011
// 0100
// 0101
// 0110
// 0111

// 4 => 100
// 3 => 011
//   => 000
