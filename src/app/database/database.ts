import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import Nedb from "nedb-promises-ts";


@Injectable()
export class Database {

    public static players = new Nedb<Player>({autoload: true});

    public static getPlayer(): Promise<Player> {
        console.log('I fired!')
        return Database.players.findOne({});
    }
}