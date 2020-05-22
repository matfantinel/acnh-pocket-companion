import { Action } from '@ngrx/store';
import { Passport } from './passport.model';

export enum PassportActionTypes {
  LoadPassportFromDb = '[App] Load Passport from DB',
  SetPassport = '[App] Set Passport',
  SavePassport = '[App] Save Passport'
}

export class PassportAction implements Action {
  type: string;
  payload: {
    data: Passport
  };
}

export class LoadPassportFromDb implements Action {
  readonly type = PassportActionTypes.LoadPassportFromDb;

  constructor() {

  }
}

export class SetPassport implements Action {
  readonly type = PassportActionTypes.SetPassport;

  constructor(readonly payload: {data: Passport}) {

  }
}

export class SavePassport implements Action {
  readonly type = PassportActionTypes.SavePassport;

  constructor(readonly payload: {data: Passport}) {

  }
}

export type ActionsUnion = LoadPassportFromDb | SetPassport;