export class TodoItem {
  id: string;
  text: string;
  done: boolean;
  subItems: TodoItem[];
  order: number;

  constructor (order: number) {
    this.order = order;
  }
}