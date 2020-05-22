import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, mergeMap, exhaustMap } from 'rxjs/operators';

import { LoadPassportFromDb, PassportActionTypes, SetPassport, SavePassport } from './passport.actions';
import { DatabaseService } from '../../database/database.service';



@Injectable()
export class PassportEffects {

  loadPassportFromDb$ = createEffect(() => 
    this.actions$.pipe(
      ofType<LoadPassportFromDb>(PassportActionTypes.LoadPassportFromDb),
      mergeMap((action) => from(this.db.getPassport())
      .pipe(
        map(passport => 
          new SetPassport({data: passport})
        )
      ))
    )
  );

  savePassport$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SavePassport>(PassportActionTypes.SavePassport),
      exhaustMap(action =>
        from(this.db.savePassport(action.payload.data)).pipe(
          map(passport => new SetPassport({data: passport}))
        )
      )
    )
  );

  constructor(private actions$: Actions, private db: DatabaseService) {}

}
