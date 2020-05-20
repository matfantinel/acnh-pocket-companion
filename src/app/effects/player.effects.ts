import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { LoadPlayerFromDb, PlayerActionTypes, SetPlayer } from '../actions/player.actions';
import { Database } from '../database/database';



@Injectable()
export class PlayerEffects {

  @Effect()
  loadPlayerFromDb$ = this.actions$
    .pipe(
      ofType<LoadPlayerFromDb>(PlayerActionTypes.LoadPlayerFromDb),
      mergeMap((action) => from(Database.getPlayer())
      .pipe(
        map(player => {
          return (new SetPlayer({playerData: player}))
        })
      ))
    )

  constructor(private actions$: Actions) {}

}
