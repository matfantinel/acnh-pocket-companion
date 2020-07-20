import { Injectable } from '@angular/core';
import { Island } from '../domains/island/island.model';
import Dexie, { PromiseExtended } from 'dexie';
import { TodoItem } from '../domains/todo/todo.model';
import { Chore } from '../domains/chores/chores.model';
import { Fish, Bug, SeaCreature, Fossil } from '../domains/critterpedia/critterpedia.model';


@Injectable()
export class DatabaseService extends Dexie {

  private _dbName = 'acnh_db'
  private _defaultSchema = {
    island: '++id',
    todos: '++id',
    chores: '++id',
    fishes: '++id',
    bugs: '++id',
    seaCreatures: '++id',
    fossils: '++id',
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
        !this.tables.some(q => q.name === 'chores') ||
        !this.tables.some(q => q.name === 'fishes') ||
        !this.tables.some(q => q.name === 'bugs') ||
        !this.tables.some(q => q.name === 'seaCreatures') ||
        !this.tables.some(q => q.name === 'fossils')) {
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

  public getChores(): Promise<Chore[] | undefined> {
    return this.table('chores').toArray();
  }

  public upsertChore(item: Chore): Promise<Chore> {
    return new Promise<Chore>((resolve, reject) => {
      this.table('chores').put(item)
        .then(() => {
          resolve();
        })
        .catch(error => {
          console.error(error);
          reject(error);
        })
    })
  }

  public clearOldChores(): void {
    this.table('chores').filter(obj => (obj as Chore).completeData < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
      .delete();
  }

  public getFishes(): Promise<Fish[] | undefined> {
    return this.table('fishes').toArray();
  }

  public upsertFish(item: Fish): Promise<Fish> {
    return new Promise<Fish>((resolve, reject) => {
      this.table('fishes').put(item)
        .then(() => {
          resolve();
        })
        .catch(error => {
          console.error(error);
          reject(error);
        })
    })
  }

  public getBugs(): Promise<Bug[] | undefined> {
    return this.table('bugs').toArray();
  }

  public upsertBug(item: Bug): Promise<Bug> {
    return new Promise<Bug>((resolve, reject) => {
      this.table('bugs').put(item)
        .then(() => {
          resolve();
        })
        .catch(error => {
          console.error(error);
          reject(error);
        })
    })
  }

  public getSeaCreatures(): Promise<SeaCreature[] | undefined> {
    return this.table('seaCreatures').toArray();
  }

  public upsertSeaCreature(item: SeaCreature): Promise<SeaCreature> {
    return new Promise<SeaCreature>((resolve, reject) => {
      this.table('seaCreatures').put(item)
        .then(() => {
          resolve();
        })
        .catch(error => {
          console.error(error);
          reject(error);
        })
    })
  }

  public getFossils(): Promise<Fossil[] | undefined> {
    return this.table('fossils').toArray();
  }

  public upsertFossil(item: Fossil): Promise<Fossil> {
    return new Promise<Fossil>((resolve, reject) => {
      this.table('fossils').put(item)
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