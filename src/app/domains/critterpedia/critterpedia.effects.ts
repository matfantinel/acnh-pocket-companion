import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, mergeMap, exhaustMap } from 'rxjs/operators';

import { DatabaseService } from '../../database/database.service';
import { LoadFishes, CritterpediaActionTypes, SetFishes, UpsertFish, LoadBugs, SetBugs, UpsertBug, LoadFossils, SetFossils, UpsertFossil, LoadSeaCreatures, SetSeaCreatures, UpsertSeaCreature } from './critterpedia.actions';



@Injectable()
export class CritterpediaEffects {

  loadFishes$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadFishes>(CritterpediaActionTypes.LoadFishes),
      mergeMap(() => from(this.db.getFishes())
        .pipe(
          map(result =>
            new SetFishes({ data: result })
          )
        ))
    )
  );

  upsertFish$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpsertFish>(CritterpediaActionTypes.UpsertFish),
      exhaustMap(action =>
        from(this.db.upsertFish(action.payload.data)).pipe(
          map(() => new LoadFishes())
        )
      )
    )
  );

  loadBugs$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadBugs>(CritterpediaActionTypes.LoadBugs),
      mergeMap(() => from(this.db.getBugs())
        .pipe(
          map(result =>
            new SetBugs({ data: result })
          )
        ))
    )
  );

  upsertBug$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpsertBug>(CritterpediaActionTypes.UpsertBug),
      exhaustMap(action =>
        from(this.db.upsertBug(action.payload.data)).pipe(
          map(() => new LoadBugs())
        )
      )
    )
  );

  loadSeaCreatures$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadSeaCreatures>(CritterpediaActionTypes.LoadSeaCreatures),
      mergeMap(() => from(this.db.getSeaCreatures())
        .pipe(
          map(result =>
            new SetSeaCreatures({ data: result })
          )
        ))
    )
  );

  upsertSeaCreature$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpsertSeaCreature>(CritterpediaActionTypes.UpsertSeaCreature),
      exhaustMap(action =>
        from(this.db.upsertSeaCreature(action.payload.data)).pipe(
          map(() => new LoadSeaCreatures())
        )
      )
    )
  );

  loadFossils$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadFossils>(CritterpediaActionTypes.LoadFossils),
      mergeMap(() => from(this.db.getFossils())
        .pipe(
          map(result =>
            new SetFossils({ data: result })
          )
        ))
    )
  );

  upsertFossil$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpsertFossil>(CritterpediaActionTypes.UpsertFossil),
      exhaustMap(action =>
        from(this.db.upsertFossil(action.payload.data)).pipe(
          map(() => new LoadFossils())
        )
      )
    )
  );

  constructor(private actions$: Actions, private db: DatabaseService) { }

}
