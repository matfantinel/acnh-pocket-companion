import { Action } from '@ngrx/store';
import { TodoItem } from './todo.model';

export enum TodoActionTypes {
  LoadTodoItems = '[Todo] Load Todo Items from DB',
  SetTodoItems = '[Todo] Set Todo Items to memory',
  UpsertTodoItem = '[Todo] Update/Insert Todo Item',
  BulkUpsertTodoItem = '[Todo] Update/Insert Todo Items in Bulk',
  DeleteTodoItem = '[Todo] Delete Todo Item',
  MarkAsDone = '[Todo] Mark Todo Item as Done',
  MarkAsNotDone = '[Todo] Mark Todo Item as Not Done',
  SetUpsertedTodoItem = '[Todo] Set Last Upserted Todo Item to memory',
}

export class TodoAction implements Action {
  type: string;
  payload: {
    data: TodoItem[];
    singleData: TodoItem;
  };
}

export class LoadTodoItems implements Action {
  readonly type = TodoActionTypes.LoadTodoItems;
}

export class SetTodoItems implements Action {
  readonly type = TodoActionTypes.SetTodoItems;

  constructor(readonly payload: { data: TodoItem[]; }) {}
}

export class UpsertTodoItem implements Action {
  readonly type = TodoActionTypes.UpsertTodoItem;

  constructor(readonly payload: { data: TodoItem; }) {}
}

export class BulkUpsertTodoItem implements Action {
  readonly type = TodoActionTypes.BulkUpsertTodoItem;

  constructor(readonly payload: { data: TodoItem[]; }) {}
}

export class DeleteTodoItem implements Action {
  readonly type = TodoActionTypes.DeleteTodoItem;

  constructor(readonly payload: { data: TodoItem; }) {}
}

export class MarkAsDone implements Action {
  readonly type = TodoActionTypes.MarkAsDone;

  constructor(readonly payload: { data: TodoItem; }) {}
}

export class MarkAsNotDone implements Action {
  readonly type = TodoActionTypes.MarkAsNotDone;

  constructor(readonly payload: { data: TodoItem; }) {}
}

export class SetUpsertedTodoItem implements Action {
  readonly type = TodoActionTypes.SetUpsertedTodoItem;

  constructor(readonly payload: { singleData: TodoItem; }) {}
}

export type ActionsUnion = LoadTodoItems | UpsertTodoItem | BulkUpsertTodoItem | DeleteTodoItem | MarkAsDone | MarkAsNotDone | SetUpsertedTodoItem;