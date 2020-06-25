import { Injectable } from '@angular/core';
import { Island } from '../domains/island/island.model';
import Dexie, { PromiseExtended } from 'dexie';
import { TodoItem } from '../domains/todo/todo.model';


@Injectable()
export class DatabaseService extends Dexie {

  private _dbName = 'acnh_db'
  private _defaultSchema = {
    island: '++id',
    todos: '++id'
  };

  constructor() {
    super('acnh_db');
    this.initialize();
  }

  private async initialize() {
    if (await Dexie.exists(this._dbName)) {
      await this.open();
      if (!this.tables.some(q => q.name === 'island') ||
        !this.tables.some(q => q.name === 'todos')) {
        await this.resetDbSchema();
      }
    } else {
      this.version(1).stores(this._defaultSchema);
    }
  }

  private resetDbSchema(): PromiseExtended<Dexie> {
    const currentVersion = this.verno;
    this.close();

    const upgraderDB = new Dexie(this._dbName);
    upgraderDB.version(currentVersion + 1).stores(this._defaultSchema);
    return upgraderDB.open().then(() => {
      upgraderDB.close();
      return this.open();
    });
  }

  public getIsland(): Promise<Island | undefined> {
    return this.table('island').toCollection().first();
  }

  public saveIsland(player: Island): Promise<Island> {
    return new Promise<Island>((resolve, reject) => {
      this.table('island').put(player)
        .then(() => {
          this.getIsland().then(res => {
            resolve(res);
          })
        })
        .catch(error => {
          console.error(error);
          reject(error);
        })
    })
  }

  public getTodoItems(): Promise<TodoItem[] | undefined> {
    return this.table('todos').toArray();
  }

  public upsertTodoItem(item: TodoItem): Promise<TodoItem> {
    return new Promise<TodoItem>((resolve, reject) => {
      this.table('todos').put(item)
        .then(id => {
          this.table('todos').get(id)
            .then(result => {
              resolve(result);
            })
        })
        .catch(error => {
          console.error(error);
          reject(error);
        })
    })
  }

  public bulkUpsertTodoItem(items: TodoItem[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.table('todos').bulkPut(items)
        .then(() => {
          resolve();
        })
        .catch(error => {
          console.error(error);
          reject(error);
        })
    })
  }

  public deleteTodoItem(item: TodoItem): Promise<void> {
    return new Promise((resolve, reject) => {
      this.table('todos').delete(item.id)
        .then(() => {
          resolve();
        })
        .catch(error => {
          console.error(error);
          reject(error);
        })
    })
  }
}