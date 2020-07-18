import { Action } from '@ngrx/store';
import { Chore } from './chores.model';

export enum ChoresActionTypes {
  LoadChores = '[Chores] Load Chores from DB',
  SetChores = '[Chores] Set Chores to memory',
  UpsertChore = '[Chores] Upsert Chore',
  ResetChores = '[Chores] Reset the state of the Chores like when day changes'
}

export class ChoresAction implements Action {
  type: string;
  payload: {
    data: Chore[];
    singleData: Chore;
  };
}

export class LoadChores implements Action {
  readonly type = ChoresActionTypes.LoadChores;
}

export class SetChores implements Action {
  readonly type = ChoresActionTypes.SetChores;
  
  constructor(readonly payload: { data: Chore[]; }) {}
}

export class UpsertChore implements Action {
  readonly type = ChoresActionTypes.UpsertChore;

  constructor(readonly payload: { data: Chore; }) {}
}

export class ResetChores implements Action {
  readonly type = ChoresActionTypes.ResetChores;
}

export type ActionsUnion = LoadChores | SetChores | UpsertChore | ResetChores;