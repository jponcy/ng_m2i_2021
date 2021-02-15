export interface Todo {
  label: string; // string/number/boolean/(any...).
  finished: boolean;
}

export const todos: Todo[] = [
  { label: 'Faire la vaiselle', finished: true },
  { label: 'Apprendre les bases d\'Angular', finished: false },
  { label: 'Apprendre ngIf', finished: false },
  { label: 'Apprendre ngFor', finished: false },
  { label: 'Faire le TP', finished: false },
];
