import { Injectable } from '@angular/core';
import { Island } from '../domains/island/island.model';
import Dexie, { PromiseExtended } from 'dexie';


@Injectable()
export class DatabaseService extends Dexie {

  private _dbName = 'acnh_db'
  private _defaultSchema = {
    island: '++id',
    todos: '++id',
    chores: '++id'
  };

  constructor() {
    super('acnh_db');
    this.initialize();
  }

  private async initialize() {
    if (await Dexie.exists(this._dbName)) {
      await this.open();
      if (!this.tables.some(q => q.name === 'island') ||
        !this.tables.some(q => q.name === 'todos') ||
        !this.tables.some(q => q.name === 'chores')) {
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
}