import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { islandReducer, IslandState } from './domains/island/island.reducer';
import { TodoState, todoReducer } from './domains/todo/todo.reducer';
import { ChoresState, choresReducer } from './domains/chores/chores.reducer';
import { CritterpediaState, critterpediaReducer } from './domains/critterpedia/critterpedia.reducer';

export interface AppState {
  island: IslandState;
  todos: TodoState;
  chores: ChoresState;
  critterpedia: CritterpediaState;
}

export const reducers: ActionReducerMap<AppState> = {
  island: islandReducer,
  todos: todoReducer,
  chores: choresReducer,
  critterpedia: critterpediaReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
