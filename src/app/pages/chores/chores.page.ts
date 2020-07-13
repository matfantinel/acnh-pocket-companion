import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import {
  Plugins
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { LoadChores, UpsertChore } from 'src/app/domains/chores/chores.actions';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { selectChores } from 'src/app/domains/chores/chores.reducer';
import { Observable, Subscription } from 'rxjs';
import { Chore, ChoreType } from 'src/app/domains/chores/chores.model';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-chores',
  templateUrl: './chores.page.html',
  styleUrls: ['./chores.page.scss'],
})
export class ChoresPage implements OnInit {

  chores: Chore[];

  villagerDiyChore: Chore;
  messageInBottleChore: Chore;
  hitRocksChore: Chore;
  moneyTreeChore: Chore;
  nookMilesChore: Chore;
  fossilsChore: Chore;

  constructor(public utils: Utils, private platform: Platform, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadChores());

    this.store.select(selectChores).subscribe(
      result => {
        if (result) {
          this.chores = result;
        } else {
          this.chores = [];
        }

        this.villagerDiyChore = this.checkIfChoreExists(ChoreType.VillagerDIY);
        this.messageInBottleChore = this.checkIfChoreExists(ChoreType.MessageInABottle);
        this.hitRocksChore = this.checkIfChoreExists(ChoreType.HitRocks);
        this.moneyTreeChore = this.checkIfChoreExists(ChoreType.MoneyTree);
        this.nookMilesChore = this.checkIfChoreExists(ChoreType.NookMiles);
        this.fossilsChore = this.checkIfChoreExists(ChoreType.Fossils);
      }
    );
  }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#FECFAC' });
    }
  }

  checkIfChoreExists(type: ChoreType) {
    if (this.chores.some(q => q.type == type)) {
      return this.chores.find(q => q.type == type);
    }
    return new Chore(type);
  }

  upsertChore(chore: Chore) {
    chore.complete = !chore.complete;
    chore.completeData = new Date();

    this.store.dispatch(new UpsertChore({ data: { ...chore } }));
  }
}
