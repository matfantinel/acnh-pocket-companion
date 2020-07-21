import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Utils } from 'src/utils';
import { Bug, Fish, SeaCreature, Fossil } from 'src/app/domains/critterpedia/critterpedia.model';
import { selectFishes, selectBugs, selectSeaCreatures, selectFossils } from 'src/app/domains/critterpedia/critterpedia.reducer';
import { LoadFishes, LoadBugs, LoadSeaCreatures, LoadFossils, UpsertBug, UpsertFish, UpsertSeaCreature, UpsertFossil, SetSelectedItem } from 'src/app/domains/critterpedia/critterpedia.actions';
import { Router } from '@angular/router';

const { StatusBar } = Plugins;

@Component({
  selector: 'app-critterpedia',
  templateUrl: './critterpedia.page.html',
  styleUrls: ['./critterpedia.page.scss'],
})
export class CritterpediaPage implements OnInit {

  activeSegment = 'bugs';

  bugs: Bug[] = [];
  fishes: Fish[] = [];
  seaCreatures: SeaCreature[] = [];
  fossils: Fossil[] = [];

  constructor(public utils: Utils, private platform: Platform, private store: Store<AppState>, private router: Router) {
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.loadData();
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#B4D8E3' });
    }
  }

  loadData() {
    this.store.dispatch(new LoadFishes());
    this.store.dispatch(new LoadBugs());
    this.store.dispatch(new LoadSeaCreatures());
    this.store.dispatch(new LoadFossils());

    const fishes$ = this.store.select(selectFishes).subscribe(
      result => {
        if (result) {
          this.fishes = result;
          if (fishes$) {
            setTimeout(() => {
              fishes$.unsubscribe();
            }, 100);
          }
        } else {
          this.fishes = [];
        }
      }
    );
    const bugs$ = this.store.select(selectBugs).subscribe(
      result => {
        if (result) {
          this.bugs = result;
          if (bugs$) {
            setTimeout(() => {
              bugs$.unsubscribe();
            }, 100);
          }
        } else {
          this.bugs = [];
        }
      }
    );
    const seaCreatures$ = this.store.select(selectSeaCreatures).subscribe(
      result => {
        if (result) {
          this.seaCreatures = result;
          if (seaCreatures$) {
            setTimeout(() => {
              seaCreatures$.unsubscribe();
            }, 100);
          }
        } else {
          this.seaCreatures = [];
        }
      }
    );
    const fossils$ = this.store.select(selectFossils).subscribe(
      result => {
        if (result) {
          this.fossils = result;
          if (fossils$) {
            setTimeout(() => {
              fossils$.unsubscribe();
            }, 100);
          }
        } else {
          this.fossils = [];
        }
      }
    );
  }

  segmentChanged(event: any) {
    this.activeSegment = event.detail.value;
  }

  toggleCaught(event: any, item: any) {
    event.preventDefault();
    event.stopPropagation();
    
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
    }
  }

  openDetails(item: any) {
    this.store.dispatch(new SetSelectedItem({ data: { ...item } }));
    this.router.navigate(['critterpedia/details']);
  }
}
