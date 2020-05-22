import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { passportReducer, PassportState } from './domains/passport/passport.reducer';

export interface AppState {
  passport: PassportState;
}

export const reducers: ActionReducerMap<AppState> = {
  passport: passportReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
