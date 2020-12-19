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

  searchFilter: string;
  isSearching: boolean;
  searchResults: any[] = [];

  bugs: Bug[] = [];
  fishes: Fish[] = [];
  seaCreatures: SeaCreature[] = [];
  fossils: Fossil[] = [];

  finishedImportingBugs: boolean = true;
  finishedImportingFishes: boolean = true;
  finishedImportingSeaCreatures: boolean = true;
  finishedImportingFossils: boolean = true;

  constructor(public utils: Utils, private platform: Platform, private store: Store<AppState>, private router: Router) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#B4D8E3' });
    } else {
      Utils.setThemeColor('#B4D8E3');
    }


    this.handleBugs();
    this.handleFishes();
    this.handleSeaCreatures();
    this.handleFossils();
  }

  handleBugs() {
    let checkInterval;
    let checkFn = (firstRun: boolean = false) => {
      this.finishedImportingBugs = Utils.areBugsImportedYet();    
      if (this.finishedImportingBugs) {
        this.loadBugs();
        clearInterval(checkInterval);
      } else if (firstRun) {
        checkInterval = setInterval(checkFn, 2000);
      }
    };
    checkFn(true);
  }
  loadBugs() {
    this.store.dispatch(new LoadBugs());

    const bugs$ = this.store.select(selectBugs).subscribe(
      result => {
        if (result) {
          this.bugs = result;
          setTimeout(() => {
            if (bugs$) {
              bugs$.unsubscribe();
            }
          }, 100);
        } else {
          this.bugs = [];
        }
      }
    );
  }

  handleFishes() {
    let checkInterval;
    let checkFn = (firstRun: boolean = false) => {
      this.finishedImportingFishes = Utils.areFishesImportedYet();    
      if (this.finishedImportingFishes) {
        this.loadFishes();
        clearInterval(checkInterval);
      } else if (firstRun) {
        checkInterval = setInterval(checkFn, 2000);
      }
    };
    checkFn(true);
  }
  loadFishes() {
    this.store.dispatch(new LoadFishes());

    const fishes$ = this.store.select(selectFishes).subscribe(
      result => {
        if (result) {
          this.fishes = result;
          setTimeout(() => {
            if (fishes$) {
              fishes$.unsubscribe();
            }
          }, 100);
        } else {
          this.fishes = [];
        }
      }
    );
  }

  handleSeaCreatures() {
    let checkInterval;
    let checkFn = (firstRun: boolean = false) => {
      this.finishedImportingSeaCreatures = Utils.areSeaCreaturesImportedYet();    
      if (this.finishedImportingSeaCreatures) {
        this.loadSeaCreatures();
        clearInterval(checkInterval);
      } else if (firstRun) {
        checkInterval = setInterval(checkFn, 2000);
      }
    };
    checkFn(true);
  }
  loadSeaCreatures() {
    this.store.dispatch(new LoadSeaCreatures());

    const seaCreatures$ = this.store.select(selectSeaCreatures).subscribe(
      result => {
        if (result) {
          this.seaCreatures = result;
          setTimeout(() => {
            if (seaCreatures$) {
              seaCreatures$.unsubscribe();
            }
          }, 100);
        } else {
          this.seaCreatures = [];
        }
      }
    );
  }

  handleFossils() {
    let checkInterval;
    let checkFn = (firstRun: boolean = false) => {
      this.finishedImportingFossils = Utils.areFossilsImportedYet();    
      if (this.finishedImportingFossils) {
        this.loadFossils();
        clearInterval(checkInterval);
      } else if (firstRun) {
        checkInterval = setInterval(checkFn, 2000);
      }
    };
    checkFn(true);
  }
  loadFossils() {
    this.store.dispatch(new LoadFossils());

    const fossils$ = this.store.select(selectFossils).subscribe(
      result => {
        if (result) {
          this.fossils = result;
          setTimeout(() => {
            if (fossils$) {
              fossils$.unsubscribe();
            }
          }, 100);
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

  applySearchFilter() {
    const filter = this.searchFilter.trim();
    if (!filter) {
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.searchResults = [];

      this.searchResults = this.searchResults.concat(this.bugs.filter(q => q.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0));
      this.searchResults = this.searchResults.concat(this.fishes.filter(q => q.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0));
      this.searchResults = this.searchResults.concat(this.seaCreatures.filter(q => q.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0));
      this.searchResults = this.searchResults.concat(this.fossils.filter(q => q.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0));
    }
  }
}
