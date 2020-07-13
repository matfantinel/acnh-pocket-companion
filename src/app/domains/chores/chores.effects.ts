import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, act } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, mergeMap, exhaustMap } from 'rxjs/operators';

import { DatabaseService } from '../../database/database.service';
import { LoadChores, ChoresActionTypes, SetChores, UpsertChore } from './chores.actions';



@Injectable()
export class ChoresEffects {

  loadChores$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadChores>(ChoresActionTypes.LoadChores),
      mergeMap(() => from(this.db.getChores())
        .pipe(
          map(result =>
            new SetChores({ data: result })
          )
        ))
    )
  );

  upsertChore$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpsertChore>(ChoresActionTypes.UpsertChore),
      exhaustMap(action =>
        from(this.db.upsertChore(action.payload.data)).pipe(
          map(() => new LoadChores())
        )
      )
    )
  );

  constructor(private actions$: Actions, private db: DatabaseService) { }

}
