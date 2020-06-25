import { AppState } from 'src/app/app.state';
import { TodoItem } from './todo.model';
import { TodoAction, TodoActionTypes } from './todo.actions';
import { Utils } from 'src/utils';

export interface TodoState {
  data: TodoItem[];
  lastUpsertedItem: TodoItem;
}

const initialTodoState: TodoState = {
  data: null,
  lastUpsertedItem: null
};

export function todoReducer(state: TodoState = initialTodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case TodoActionTypes.SetTodoItems:
      return {
        data: action.payload.data,
        lastUpsertedItem: state.lastUpsertedItem
      };
    case TodoActionTypes.SetUpsertedTodoItem:
      return {
        ...state,
        lastUpsertedItem: action.payload.singleData
      };
    default:
      return state;
  }
}

export const selectAllTodoItems = (state: AppState) => Utils.deepSpreadArray(state.todos.data);
export const selectNotDoneTodoItems = (state: AppState) => state.todos.data ? Utils.deepSpreadArray(state.todos.data).filter(q => !q.done).sort((a, b) => a.order > b.order ? 1 : -1) : null;
export const selectDoneTodoItems = (state: AppState) => state.todos.data ? Utils.deepSpreadArray(state.todos.data).filter(q => q.done).sort((a, b) => a.order > b.order ? 1 : -1) : null;
export const selectLastUpsertedItem = (state: AppState) => state.todos.lastUpsertedItem ? { ...state.todos.lastUpsertedItem } : null;