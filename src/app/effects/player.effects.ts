import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, mergeMap, exhaustMap } from 'rxjs/operators';

import { LoadPlayerFromDb, PlayerActionTypes, SetPlayer, SavePlayer } from '../actions/player.actions';
import { Database } from '../database/database';



@Injectable()
export class PlayerEffects {

  loadPlayerFromDb$ = createEffect(() => 
    this.actions$.pipe(
      ofType<LoadPlayerFromDb>(PlayerActionTypes.LoadPlayerFromDb),
      mergeMap((action) => from(Database.getPlayer())
      .pipe(
        map(player => 
          new SetPlayer({playerData: player})
        )
      ))
    )
  );

  savePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SavePlayer>(PlayerActionTypes.SavePlayer),
      exhaustMap(action =>
        from(Database.savePlayer(action.payload.playerData)).pipe(
          map(player => new SetPlayer({playerData: player}))
        )
      )
    )
  );

  constructor(private actions$: Actions) {}

}
