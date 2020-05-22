import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import Dexie from 'dexie';


@Injectable()
export class DatabaseService extends Dexie {

    constructor() {
        super('acnh_db');
        this.version(1).stores({
            players: '++id',
        })
    }

    public getPlayer(): Promise<Player | undefined> {
        return this.table('players').toCollection().first();
    }

    public savePlayer(player: Player): Promise<Player> {
        return new Promise<Player>((resolve, reject) => {
            this.table('players').put(player)
                .then(() => {
                    this.getPlayer().then(res => {
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