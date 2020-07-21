import { AppState } from 'src/app/app.state';
import { Utils } from 'src/utils';
import { Fish, Bug, SeaCreature, Fossil } from './critterpedia.model';
import { CritterpediaAction, CritterpediaActionTypes } from './critterpedia.actions';

export interface CritterpediaState {
  fishes: Fish[];
  bugs: Bug[];
  seaCreatures: SeaCreature[];
  fossils: Fossil[];
  selectedItem: any;
}

const initialCritterpediaState: CritterpediaState = {
  fishes: null,
  bugs: null,
  seaCreatures: null,
  fossils: null,
  selectedItem: null
};

export function critterpediaReducer(state: CritterpediaState = initialCritterpediaState, action: CritterpediaAction): CritterpediaState {
  switch (action.type) {
    case CritterpediaActionTypes.SetFishes:
      return {
        fishes: action.payload.data,
        bugs: state.bugs,
        seaCreatures: state.seaCreatures,
        fossils: state.fossils,
        selectedItem: state.selectedItem
      };
    case CritterpediaActionTypes.SetBugs:
      return {
        fishes: state.fishes,
        bugs: action.payload.data,
        seaCreatures: state.seaCreatures,
        fossils: state.fossils,
        selectedItem: state.selectedItem
      };
    case CritterpediaActionTypes.SetSeaCreatures:
      return {
        fishes: state.fishes,
        bugs: state.bugs,
        seaCreatures: action.payload.data,
        fossils: state.fossils,
        selectedItem: state.selectedItem
      };
    case CritterpediaActionTypes.SetFossils:
      return {
        fishes: state.fishes,
        bugs: state.bugs,
        seaCreatures: state.seaCreatures,
        fossils: action.payload.data,
        selectedItem: state.selectedItem
      };
    case CritterpediaActionTypes.SetSelectedItem:
      return {
        fishes: state.fishes,
        bugs: state.bugs,
        seaCreatures: state.seaCreatures,
        fossils: state.fossils,
        selectedItem: action.payload.data
      };
    default:
      return state;
  }
}

export const selectFishes = (state: AppState) => state.critterpedia.fishes == null ? null : Utils.deepSpreadArray(state.critterpedia.fishes);
export const selectBugs = (state: AppState) => state.critterpedia.bugs == null ? null : Utils.deepSpreadArray(state.critterpedia.bugs);
export const selectSeaCreatures = (state: AppState) => state.critterpedia.seaCreatures == null ? null : Utils.deepSpreadArray(state.critterpedia.seaCreatures);
export const selectFossils = (state: AppState) => state.critterpedia.fossils == null ? null : Utils.deepSpreadArray(state.critterpedia.fossils);
export const selectSelectedItem = (state: AppState) => state.critterpedia.selectedItem == null ? null : { ...state.critterpedia.selectedItem };