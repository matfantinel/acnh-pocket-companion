import { AppState } from 'src/app/app.state';
import { IslandActionTypes, IslandAction } from './island.actions';
import { Island } from './island.model';

export interface IslandState {
  data: Island | null;
}

const initialIslandState: IslandState = {
  data: null
};

export function islandReducer(state: IslandState = initialIslandState, action: IslandAction): IslandState {
  switch (action.type) {
    case IslandActionTypes.SetIsland:
      return {
        data: action.payload.data
      };
    default:
      return state;
  }
}

export const selectIsland = (state: AppState) => state.island.data;
export const selectIslandName = (state: AppState) => state.island.data ? state.island.data.name : 'Island';
export const selectIslandHemisphere = (state: AppState) => state.island.data ? state.island.data.hemisphere : null;
export const selectResidentRepresentative = (state: AppState) => state.island.data ? state.island.data.residentRepresentative : '';
export const selectResidentRepresentativeName = (state: AppState) => state.island.data && state.island.data.residentRepresentative ? state.island.data.residentRepresentative.name : '';