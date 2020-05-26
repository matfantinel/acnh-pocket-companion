import { Injectable } from '@angular/core';
import { Island } from '../domains/island/island.model';
import Dexie from 'dexie';


@Injectable()
export class DatabaseService extends Dexie {

    constructor() {
        super('acnh_db');
        this.version(1).stores({
            island: '++id',
        })
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