import { Action } from '@ngrx/store';
import { Island } from './island.model';

export enum IslandActionTypes {
  LoadIslandFromDb = '[Island] Load Island from DB',
  SetIsland = '[Island] Set Island',
  SaveIsland = '[Island] Save Island'
}

export class IslandAction implements Action {
  type: string;
  payload: {
    data: Island;
  };
}

export class LoadIslandFromDb implements Action {
  readonly type = IslandActionTypes.LoadIslandFromDb;
}

export class SetIsland implements Action {
  readonly type = IslandActionTypes.SetIsland;

  constructor(readonly payload: { data: Island; }) {

  }
}

export class SaveIsland implements Action {
  readonly type = IslandActionTypes.SaveIsland;

  constructor(readonly payload: { data: Island; }) {

  }
}

export type ActionsUnion = LoadIslandFromDb | SetIsland | SaveIsland;