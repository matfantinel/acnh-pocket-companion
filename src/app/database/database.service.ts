import { Injectable } from '@angular/core';
import { Passport } from '../domains/passport/passport.model';
import Dexie from 'dexie';


@Injectable()
export class DatabaseService extends Dexie {

    constructor() {
        super('acnh_db');
        this.version(1).stores({
            passport: '++id',
        })
    }

    public getPassport(): Promise<Passport | undefined> {
        return this.table('passport').toCollection().first();
    }

    public savePassport(player: Passport): Promise<Passport> {
        return new Promise<Passport>((resolve, reject) => {
            this.table('passport').put(player)
                .then(() => {
                    this.getPassport().then(res => {
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