import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, mergeMap, exhaustMap } from 'rxjs/operators';

import { LoadPlayerFromDb, PlayerActionTypes, SetPlayer, SavePlayer } from '../actions/player.actions';
import { DatabaseService } from '../database/database.service';



@Injectable()
export class PlayerEffects {

  loadPlayerFromDb$ = createEffect(() => 
    this.actions$.pipe(
      ofType<LoadPlayerFromDb>(PlayerActionTypes.LoadPlayerFromDb),
      mergeMap((action) => from(this.db.getPlayer())
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
        from(this.db.savePlayer(action.payload.playerData)).pipe(
          map(player => new SetPlayer({playerData: player}))
        )
      )
    )
  );

  constructor(private actions$: Actions, private db: DatabaseService) {}

}
