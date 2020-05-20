import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { Player } from '../models/player';
import { PlayerAction, PlayerActionTypes } from '../actions/player.actions';

export interface PlayerState {
  playerData: Player | null;
}

const initialPlayerState: PlayerState = {
  playerData: null
};

export interface AppState {
  player: PlayerState;
}

export function playerReducer(state: PlayerState = initialPlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case PlayerActionTypes.SetPlayer:
      return {
        playerData: action.payload.playerData
      };
    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  player: playerReducer
};

export const selectPlayer = (state: AppState) => state.player.playerData;
export const selectPlayerName = (state: AppState) => state.player.playerData ? state.player.playerData.name : 'Your Name';

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
