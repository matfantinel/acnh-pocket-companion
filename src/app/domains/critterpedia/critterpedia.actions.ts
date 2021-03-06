import { Action } from '@ngrx/store';
import { Fish, Bug, SeaCreature, Fossil, Villager } from './critterpedia.model';

export enum CritterpediaActionTypes {
  LoadFishes = '[Critterpedia] Load Fishes from DB',
  SetFishes = '[Critterpedia] Set Fishes to memory',
  UpsertFish = '[Critterpedia] Upsert Fish',

  LoadBugs = '[Critterpedia] Load Bugs from DB',
  SetBugs = '[Critterpedia] Set Bugs to memory',
  UpsertBug = '[Critterpedia] Upsert Bug',

  LoadSeaCreatures = '[Critterpedia] Load Sea Creatures from DB',
  SetSeaCreatures = '[Critterpedia] Set Sea Creatures to memory',
  UpsertSeaCreature = '[Critterpedia] Upsert Sea Creature',

  LoadFossils = '[Critterpedia] Load Fossils from DB',
  SetFossils = '[Critterpedia] Set Fossils to memory',
  UpsertFossil = '[Critterpedia] Upsert Fossil',

  LoadVillagers = '[Critterpedia] Load Villagers from DB',
  SetVillagers = '[Critterpedia] Set Villagers to memory',
  UpsertVillager = '[Critterpedia] Upsert Villager',

  SetSelectedItem = '[Critterpedia] Set selected item to display details'
}

export class CritterpediaAction implements Action {
  type: string;
  payload: {
    data: any[];
  };
}

export class LoadFishes implements Action {
  readonly type = CritterpediaActionTypes.LoadFishes;
}

export class SetFishes implements Action {
  readonly type = CritterpediaActionTypes.SetFishes;

  constructor(readonly payload: { data: Fish[]; }) { }
}

export class UpsertFish implements Action {
  readonly type = CritterpediaActionTypes.UpsertFish;

  constructor(readonly payload: { data: Fish; }) { }
}

export class LoadBugs implements Action {
  readonly type = CritterpediaActionTypes.LoadBugs;
}

export class SetBugs implements Action {
  readonly type = CritterpediaActionTypes.SetBugs;

  constructor(readonly payload: { data: Bug[]; }) { }
}

export class UpsertBug implements Action {
  readonly type = CritterpediaActionTypes.UpsertBug;

  constructor(readonly payload: { data: Bug; }) { }
}

export class LoadSeaCreatures implements Action {
  readonly type = CritterpediaActionTypes.LoadSeaCreatures;
}

export class SetSeaCreatures implements Action {
  readonly type = CritterpediaActionTypes.SetSeaCreatures;

  constructor(readonly payload: { data: SeaCreature[]; }) { }
}

export class UpsertSeaCreature implements Action {
  readonly type = CritterpediaActionTypes.UpsertSeaCreature;

  constructor(readonly payload: { data: SeaCreature; }) { }
}

export class LoadFossils implements Action {
  readonly type = CritterpediaActionTypes.LoadFossils;
}

export class SetFossils implements Action {
  readonly type = CritterpediaActionTypes.SetFossils;

  constructor(readonly payload: { data: Fossil[]; }) { }
}

export class UpsertFossil implements Action {
  readonly type = CritterpediaActionTypes.UpsertFossil;

  constructor(readonly payload: { data: Fossil; }) { }
}

export class LoadVillagers implements Action {
  readonly type = CritterpediaActionTypes.LoadVillagers;
}

export class SetVillagers implements Action {
  readonly type = CritterpediaActionTypes.SetVillagers;

  constructor(readonly payload: { data: Villager[]; }) { }
}

export class UpsertVillager implements Action {
  readonly type = CritterpediaActionTypes.UpsertVillager;

  constructor(readonly payload: { data: Villager; }) { }
}

export class SetSelectedItem implements Action {
  readonly type = CritterpediaActionTypes.SetSelectedItem;

  constructor(readonly payload: { data: any; }) { }
}

export type ActionsUnion = LoadFishes | SetFishes | UpsertFish | LoadBugs | SetBugs |
UpsertBug | LoadSeaCreatures | SetSeaCreatures | UpsertSeaCreature |
LoadFossils | SetFossils | UpsertFossil | LoadVillagers | SetVillagers | UpsertVillager | SetSelectedItem;