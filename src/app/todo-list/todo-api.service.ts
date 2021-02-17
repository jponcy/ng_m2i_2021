import { Observable, Subject } from 'rxjs';
import { Todo } from './models';

const todos: Todo[] = [
  { label: 'Faire la vaiselle', finished: true },
  { label: 'Apprendre les bases d\'Angular', finished: false },
  { label: 'Apprendre ngIf', finished: false },
  { label: 'Apprendre ngFor', finished: false },
  { label: 'Faire le TP', finished: false },
];


export class TodoApiService {
  private subject = new Subject<Todo[]>();
  private counter = 0;
  observable: Observable<Todo[]> = this.subject;

  constructor() {
    setInterval(this.generateSubject, 2_500);
  }

  private readonly generateSubject = () => {
    if (this.counter < todos.length) {
      this.counter++;
    }

    this.subject.next(todos.slice(0, this.counter));
  }
}
