import { AppState } from 'src/app/app.state';
import { Utils } from 'src/utils';
import { Chore } from './chores.model';
import { ChoresAction, ChoresActionTypes } from './chores.actions';

export interface ChoresState {
  data: Chore[];
}

const initialChoresState: ChoresState = {
  data: null
};

export function choresReducer(state: ChoresState = initialChoresState, action: ChoresAction): ChoresState {
  switch (action.type) {
    case ChoresActionTypes.SetChores:
      return {
        data: action.payload.data
      };
    default:
      return state;
  }
}

export const selectChores = (state: AppState) => state.chores.data == null ? null : Utils.deepSpreadArray(state.chores.data.filter(q => Utils.areSameDay(q.completeData, new Date())));