import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromPlayer from './player.reducer';

export interface State {
  [fromPlayer.featureKey]: any
}

export const reducers: ActionReducerMap<State> = {
  [fromPlayer.featureKey]: fromPlayer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];