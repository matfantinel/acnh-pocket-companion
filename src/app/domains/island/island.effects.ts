import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, mergeMap, exhaustMap } from 'rxjs/operators';

import { LoadIslandFromDb, IslandActionTypes, SetIsland, SaveIsland } from './island.actions';
import { DatabaseService } from '../../database/database.service';



@Injectable()
export class IslandEffects {

  loadIslandFromDb$ = createEffect(() => 
    this.actions$.pipe(
      ofType<LoadIslandFromDb>(IslandActionTypes.LoadIslandFromDb),
      mergeMap(() => from(this.db.getIsland())
        .pipe(
          map(island => 
            new SetIsland({data: island})
          )
        ))
    )
  );

  saveIsland$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SaveIsland>(IslandActionTypes.SaveIsland),
      exhaustMap(action =>
        from(this.db.saveIsland(action.payload.data)).pipe(
          map(island => new SetIsland({data: island}))
        )
      )
    )
  );

  constructor(private actions$: Actions, private db: DatabaseService) {}

}
