import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { islandReducer, IslandState } from './domains/island/island.reducer';
import { TodoState, todoReducer } from './domains/todo/todo.reducer';

export interface AppState {
  island: IslandState;
  todos: TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  island: islandReducer,
  todos: todoReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
