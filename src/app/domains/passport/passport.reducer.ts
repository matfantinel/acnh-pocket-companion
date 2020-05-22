import { AppState } from 'src/app/app.state';
import { PassportActionTypes, PassportAction } from './passport.actions';
import { Passport } from './passport.model';

export interface PassportState {
  data: Passport | null;
}

const initialPassportState: PassportState = {
  data: null
};

export function passportReducer(state: PassportState = initialPassportState, action: PassportAction): PassportState {
  switch (action.type) {
    case PassportActionTypes.SetPassport:
      return {
        data: action.payload.data
      };
    default:
      return state;
  }
}

export const selectPassport = (state: AppState) => state.passport.data;
export const selectPassportName = (state: AppState) => state.passport.data ? state.passport.data.name : '';