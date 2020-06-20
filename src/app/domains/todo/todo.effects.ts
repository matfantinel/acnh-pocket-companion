import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, act } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, mergeMap, exhaustMap } from 'rxjs/operators';

import { LoadTodoItems, TodoActionTypes, SetTodoItems, UpsertTodoItem, DeleteTodoItem, SetUpsertedTodoItem } from './todo.actions';
import { DatabaseService } from '../../database/database.service';



@Injectable()
export class TodoEffects {

  loadTodoItems$ = createEffect(() => 
    this.actions$.pipe(
      ofType<LoadTodoItems>(TodoActionTypes.LoadTodoItems),
      mergeMap(() => from(this.db.getTodoItems())
        .pipe(
          map(result => 
            new SetTodoItems({data: result})
          )
        ))
    )
  );

  upsertTodoItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpsertTodoItem>(TodoActionTypes.UpsertTodoItem),
      exhaustMap(action => 
        from(this.db.upsertTodoItem(action.payload.data)).pipe(
          map(result => new SetUpsertedTodoItem({singleData: result}))
        )
      )
    )
  );

  deleteTodoItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeleteTodoItem>(TodoActionTypes.DeleteTodoItem),
      exhaustMap(action => 
        from(this.db.deleteTodoItem(action.payload.data)).pipe(
          map(() => new LoadTodoItems())
        )
      )
    )
  );

  constructor(private actions$: Actions, private db: DatabaseService) {}

}
