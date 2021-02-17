import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Todo } from './models';

const todos: Todo[] = [
  { label: 'Faire la vaiselle', finished: true },
  { label: 'Apprendre les bases d\'Angular', finished: false },
  { label: 'Apprendre ngIf', finished: false },
  { label: 'Apprendre ngFor', finished: false },
  { label: 'Faire le TP', finished: false },
];

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  getAll(): Observable<Todo[]> {
    // TODO: Implement real version!
    return of(todos).pipe(delay(1_500));
  }
}
