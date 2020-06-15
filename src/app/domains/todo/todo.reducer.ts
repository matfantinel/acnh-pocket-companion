import { AppState } from 'src/app/app.state';
import { TodoItem } from './todo.model';
import { TodoAction, TodoActionTypes } from './todo.actions';
import { Utils } from 'src/utils';

export interface TodoState {
  data: TodoItem[];
}

const initialTodoState: TodoState = {
  data: null
};

export function todoReducer(state: TodoState = initialTodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case TodoActionTypes.SetTodoItems:
      return {
        data: action.payload.data
      };
    default:
      return state;
  }
}

export const selectAllTodoItems = (state: AppState) => Utils.deepSpreadArray(state.todos.data);
export const selectNotDoneTodoItems = (state: AppState) => state.todos.data ? Utils.deepSpreadArray(state.todos.data).filter(q => !q.done) : null;
export const selectDoneTodoItems = (state: AppState) => state.todos.data ? Utils.deepSpreadArray(state.todos.data).filter(q => q.done) : null;