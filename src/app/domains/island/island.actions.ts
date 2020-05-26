import { Action } from '@ngrx/store';
import { Island } from './island.model';

export enum IslandActionTypes {
  LoadIslandFromDb = '[App] Load Island from DB',
  SetIsland = '[App] Set Island',
  SaveIsland = '[App] Save Island'
}

export class IslandAction implements Action {
  type: string;
  payload: {
    data: Island
  };
}

export class LoadIslandFromDb implements Action {
  readonly type = IslandActionTypes.LoadIslandFromDb;

  constructor() {

  }
}

export class SetIsland implements Action {
  readonly type = IslandActionTypes.SetIsland;

  constructor(readonly payload: {data: Island}) {

  }
}

export class SaveIsland implements Action {
  readonly type = IslandActionTypes.SaveIsland;

  constructor(readonly payload: {data: Island}) {

  }
}

export type ActionsUnion = LoadIslandFromDb | SetIsland;