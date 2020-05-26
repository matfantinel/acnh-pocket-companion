import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { islandReducer, IslandState } from './domains/island/island.reducer';

export interface AppState {
  island: IslandState;
}

export const reducers: ActionReducerMap<AppState> = {
  island: islandReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
