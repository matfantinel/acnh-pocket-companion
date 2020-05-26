import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectIslandName, selectResidentRepresentativeName } from 'src/app/domains/island/island.reducer';
import {
  Plugins
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  today = new Date();
  playerName$: Observable<string>;
  islandName$: Observable<string>;

  constructor(public utils: Utils, private store: Store<AppState>, private platform: Platform) {
    this.islandName$ = this.store.pipe(select(selectIslandName));
    this.playerName$ = this.store.pipe(select(selectResidentRepresentativeName));
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.platform.is('mobile')) {
      StatusBar.setBackgroundColor({ color: '#f5f2e3' });
    }
  }

}
