import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Plugins } from '@capacitor/core';
import { Utils } from 'src/utils';
import { selectSelectedItem } from 'src/app/domains/critterpedia/critterpedia.reducer';
import { UpsertFish, UpsertBug, UpsertSeaCreature, UpsertFossil, UpsertVillager } from 'src/app/domains/critterpedia/critterpedia.actions';
import { Island } from 'src/app/domains/island/island.model';
import { selectIsland } from 'src/app/domains/island/island.reducer';
import { Platform } from '@ionic/angular';

const { StatusBar } = Plugins;

@Component({
  selector: 'app-critter-details',
  templateUrl: './critter-details.page.html',
  styleUrls: ['./critter-details.page.scss'],
})
export class CritterDetailsPage implements OnInit {

  item: any;
  island: Island;

  blathersInfoOpen: boolean

  constructor(public utils: Utils, private store: Store<AppState>, private platform: Platform) {
  }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#B4D8E3' });
    } else {
      Utils.setThemeColor('#B4D8E3');
    }
  }

  ngOnInit() {
    const obs$ = this.store.select(selectSelectedItem).subscribe(
      result => {
        if (result) {
          this.item = result;
          setTimeout(() => {
            if (obs$) {
              obs$.unsubscribe();
            }
          }, 100);
        } else {
          this.item = null;
        }
      }
    );

    const obsIsland$ = this.store.select(selectIsland).subscribe(
      result => {
        if (result) {
          this.island = result;
          setTimeout(() => {
            if (obsIsland$) {
              obsIsland$.unsubscribe();
            }
          }, 100);
        } else {
          this.island = null;
        }
      }
    );
  }

  toggleCaught(item: any) {
    item.caught = !item.caught;
    switch (item.type) {
      case 'fishes':
        this.store.dispatch(new UpsertFish({ data: { ...item } }));
        break;
      case 'bugs':
        this.store.dispatch(new UpsertBug({ data: { ...item } }));
        break;
      case 'seaCreatures':
        this.store.dispatch(new UpsertSeaCreature({ data: { ...item } }));
        break;
      case 'fossils':
        this.store.dispatch(new UpsertFossil({ data: { ...item } }));
        break;
      case 'villagers':
        this.store.dispatch(new UpsertVillager({ data: { ...item } }));
        break;
    }
  }

  isAvailableOnMonth(month: number) {
    if (this.island.hemisphere == 'Southern') {
      return this.item.availability.monthsSouthernHemisphere.some(q => q === month);
    } else {
      return this.item.availability.monthsNorthernHemisphere.some(q => q === month);
    }
  }

  isAvailableOnTime(hour: number) {
    return this.item.availability.hoursOfDay.some(q => q === hour);
  }
}
