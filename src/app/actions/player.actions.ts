import { Action } from '@ngrx/store';
import { Player } from '../models/player';

export enum PlayerActionTypes {
  LoadPlayerFromDb = '[App] Load Player from DB',
  SetPlayer = '[App] Set Player',
  SavePlayer = '[App] Save Player'
}

export class PlayerAction implements Action {
  type: string;
  payload: {
    playerData: Player
  };
}

export class LoadPlayerFromDb implements Action {
  readonly type = PlayerActionTypes.LoadPlayerFromDb;

  constructor() {

  }
}

export class SetPlayer implements Action {
  readonly type = PlayerActionTypes.SetPlayer;

  constructor(readonly payload: {playerData: Player}) {

  }
}

export class SavePlayer implements Action {
  readonly type = PlayerActionTypes.SavePlayer;

  constructor(readonly payload: {playerData: Player}) {

  }
}

export type ActionsUnion = LoadPlayerFromDb | SetPlayer;