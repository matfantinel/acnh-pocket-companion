import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import Nedb from "nedb-promises-ts";


@Injectable()
export class Database {

    public static players = new Nedb<Player>({ autoload: true });

    public static getPlayer(): Promise<Player> {
        return Database.players.findOne({});
    }

    public static savePlayer(player: Player): Promise<Player> {
        return new Promise<Player>((resolve, reject) => {
            Database.players.update({name: 'test'}, player, { upsert: true, returnUpdatedDocs: true })
                .then(({numAffected, document}) => {
                    resolve(document);
                }).catch(error => {
                    console.error(error);
                    reject(error);
                })
        })

    }
}