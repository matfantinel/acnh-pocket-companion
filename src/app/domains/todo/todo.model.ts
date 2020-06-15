export class TodoItem {
  id: string;
  text: string;
  done: boolean;
  subItems: TodoItem[];   
}