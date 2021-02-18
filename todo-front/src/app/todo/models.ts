interface TodoBase {
  id: number;
  label: string; // string/number/boolean/(any...).
}

export interface Todo extends TodoBase {
  finished: boolean;
  tags: Tag[];
}

export interface TodoDto extends TodoBase {
  finished_at: Date;
  tags: number[];
}

// let tab1: number[];
// let tab2: (number|string)[]; // Non !!
// let tab3: Array<number|string>;


type wtf = string|number|false|undefined|never;

let toto: wtf;

toto = 'coucou';
toto = 3;

type trois = 3|'3';

const lettre: trois = '3';
const chiffre: trois = 3;
// const chiffre2: trois = 4;

let anonym: string|{ a: number } = 'coucou';
anonym = { a: 42 };
// anonym = { a: 42, b: 'trois' };


export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface TagDTO extends Tag {
  created_at: string;
  updated_at: string;
}

// export class Task {
//   constructor(public readonly label: string, public finished = false) {}
// }

// const tasks: Task[] = [
//   new Task('Faire la vaiselle'),
//   new Task('Apprendre les bases d\'Angular', true),
// ];
