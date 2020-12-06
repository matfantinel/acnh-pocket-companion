import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SaveIsland } from 'src/app/domains/island/island.actions';
import { Island } from 'src/app/domains/island/island.model';
import { selectIsland } from 'src/app/domains/island/island.reducer';
import { Utils } from 'src/utils';
import {
  Plugins
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-island',
  templateUrl: './island.page.html',
  styleUrls: ['./island.page.scss'],
})
export class IslandPage implements OnInit {

  model: Island;
  dirty: boolean;

  constructor(public utils: Utils, private store: Store<AppState>, private platform: Platform) {
  }

  ngOnInit() {
    this.loadIsland();
  }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#B3E2B4' });
    } else {
      Utils.setThemeColor('#B3E2B4');
    }
  }

  loadIsland() {
    this.store.select(selectIsland).subscribe(
      result => {
        if (result) {
          this.model = { ...result };
          this.model.residentRepresentative = { ...result.residentRepresentative }
        } else {
          this.model = new Island();
        }
      }
    )
  }

  saveIsland = () => {
    this.store.dispatch(new SaveIsland({ data: this.model }));
  }

  setDirty() {
    this.dirty = true;
  }

}
