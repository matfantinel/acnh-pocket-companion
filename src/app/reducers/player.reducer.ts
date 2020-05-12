import { createReducer, on, createAction, props, Action, createSelector, select } from '@ngrx/store';
import { Player } from 'src/app/models/player';
import { State } from '.';

//#region State

export const featureKey = 'player';

export interface PlayerState {
  player: Player
}

const initialState: PlayerState = {
  player: {
    name: 'Your Name',
    birthday: new Date(2000, 1, 1)
  }
};

//#endregion

//#region Actions

export const save = createAction(
  'Player Saved',
  props<{ value: Player }>()
);

//#endregion

//#region Selectors

export const selectPlayer = (state: State) => state.player.player;

export const selectPlayerName = createSelector(
  selectPlayer,
  (player: Player) => player.name
);

//#endregion

//#region Reducer

const playerReducer = createReducer(
  initialState,
  on(save, (state, { value }) => ({
    ...state, player: value
  }))
);

export function reducer(state: PlayerState | undefined, action: Action) {
  return playerReducer(state, action);
}

//#endregion