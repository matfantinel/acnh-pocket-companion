import { createReducer, on, createAction, props, Action, createSelector, select } from '@ngrx/store';
import { Player } from 'src/app/models/player';
import { State } from '.';

//#region State -> Responsible for keeping the data

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

//#region Actions -> Called when a component wants to change state data

export const save = createAction(
  'Player Saved',
  props<{ value: Player }>()
);

//#endregion

//#region Selectors -> Called by components to get data from state

export const selectPlayer = (state: State) => state.player.player;

export const selectPlayerName = createSelector(
  selectPlayer,
  (player: Player) => player.name
);

//#endregion

//#region Reducer -> Handles state data transition

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