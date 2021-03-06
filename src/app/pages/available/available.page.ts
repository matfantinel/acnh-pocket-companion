import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { LoadBugs, LoadFishes, LoadSeaCreatures, SetSelectedItem } from 'src/app/domains/critterpedia/critterpedia.actions';
import { Bug, CritterBase, Fish, SeaCreature } from 'src/app/domains/critterpedia/critterpedia.model';
import { selectBugs, selectFishes, selectSeaCreatures } from 'src/app/domains/critterpedia/critterpedia.reducer';
import { selectIslandHemisphere } from 'src/app/domains/island/island.reducer';
import { Utils } from 'src/utils';
import { trigger, state, style, animate, transition } from '@angular/animations';

const { StatusBar } = Plugins;

@Component({
  selector: 'app-available',
  templateUrl: './available.page.html',
  styleUrls: ['./available.page.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ transform: 'scale(0)', opacity: 0 }),
            animate('.3s ease-out', 
                    style({ transform: 'scale(1)', opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ transform: 'scale(1)', opacity: 1 }),
            animate('.3s ease-in', 
                    style({ transform: 'scale(0)', opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AvailablePage implements OnInit {

  onlyNotCaught: boolean = false;

  bugs: Bug[] = [];
  fishes: Fish[] = [];
  seaCreatures: SeaCreature[] = [];

  availableNow: {
    bugs: Bug[],
    fishes: Fish[],
    seaCreatures: SeaCreature[]
  };

  //TODO: deal with finishedImporting (make an empty state)
  finishedImporting: boolean;

  activeSegment = 'bugs';
  filtersOpen: boolean;

  bugFilters: string[] = [];
  bugLocations: string[] = null;
  fishFilters: string[] = [];
  fishLocations: string[] = null;

  hemisphere: string;

  constructor(public utils: Utils, private platform: Platform, private store: Store<AppState>, private router: Router) { }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#e1f47b' });
    } else {
      Utils.setThemeColor('#e1f47b');
    }

    console.log('fired');
    this.handleLoad();
  }

  ngOnInit() { }

  handleLoad() {
    this.store.select(selectIslandHemisphere).subscribe(result => {
      this.hemisphere = result;
    })

    let checkInterval;
    let checkFn = (firstRun: boolean = false) => {
      this.finishedImporting = Utils.areBugsImportedYet() &&
        Utils.areFishesImportedYet() &&
        Utils.areSeaCreaturesImportedYet();

      if (this.finishedImporting) {
        this.loadData();
        clearInterval(checkInterval);
      } else if (firstRun) {
        checkInterval = setInterval(checkFn, 2000);
      }
    };
    checkFn(true);
  }

  openDetails(item: any) {
    this.store.dispatch(new SetSelectedItem({ data: { ...item } }));
    this.router.navigate(['critterpedia/details']);
  }

  segmentChanged(event: any) {
    this.activeSegment = event.detail.value;
  }

  setBugFilter(filter: string) {
    let index = this.bugFilters.indexOf(filter);
    if (index >= 0) {
      this.bugFilters.splice(index, 1);
    } else {
      this.bugFilters.push(filter);
    }

    this.filterData()
  }

  setFishFilter(filter: string) {
    let index = this.fishFilters.indexOf(filter);
    if (index >= 0) {
      this.fishFilters.splice(index, 1);
    } else {
      this.fishFilters.push(filter);
    }

    this.filterData()
  }

  async loadData() {
    // if (this.bugs.length <= 0 && this.fishes.length <= 0 && this.seaCreatures.length <= 0) {
      await Promise.all([this.loadBugs(),
      this.loadFishes(),
      this.loadSeaCreatures()]);
    // }

    this.filterData();
  }

  filterData() {
    this.availableNow = {
      bugs: this.getAvailableOnly(this.bugs),
      fishes: this.getAvailableOnly(this.fishes),
      seaCreatures: this.getAvailableOnly(this.seaCreatures)
    };
  }

  getAvailableOnly(items: CritterBase[]) {
    const type = items[0].type;

    if (this.onlyNotCaught) {
      items = items.filter(x => !x.caught);
    }

    const currentMonth = new Date().getMonth() + 1;
    if (this.hemisphere === 'Northern') {
      items = items.filter(x => x.availability.monthsNorthernHemisphere.indexOf(currentMonth) >= 0);
    } else {
      items = items.filter(x => x.availability.monthsSouthernHemisphere.indexOf(currentMonth) >= 0);
    }

    const currentHour = new Date().getHours();
    items = items.filter(x => x.availability.hoursOfDay.indexOf(currentHour) >= 0);

    if (type == 'bugs') {
      this.bugLocations = [...new Set(items.map(item => item.availability.location))].filter(x => x);

      if (this.bugFilters && this.bugFilters.length > 0) {
        this.bugFilters = this.bugFilters.filter(x => this.bugLocations.indexOf(x) >= 0);

        if (this.bugFilters.length > 0) {
          items = items.filter(x => this.bugFilters.some(f => f == x.availability.location));
        }
      }
    } else if (type == 'fishes') {
      this.fishLocations = [...new Set(items.map(item => item.availability.location))].filter(x => x);

      if (this.fishFilters && this.fishFilters.length > 0) {
        this.fishFilters = this.fishFilters.filter(x => this.fishLocations.indexOf(x) >= 0);

        if (this.fishFilters.length > 0) {
          items = items.filter(x => this.fishFilters.some(f => f == x.availability.location));
        }
      }
    }

    return items;
  }

  loadBugs() {
    return new Promise<void>(resolve => {
      this.store.dispatch(new LoadBugs());

      const bugs$ = this.store.select(selectBugs).subscribe(
        result => {
          if (result) {
            this.bugs = result;
            setTimeout(() => {
              if (bugs$) {
                bugs$.unsubscribe();
              }
              resolve();
            }, 100);
          } else {
            this.bugs = [];
          }
        }
      );
    });
  }

  loadFishes() {
    return new Promise<void>(resolve => {
      this.store.dispatch(new LoadFishes());

      const fishes$ = this.store.select(selectFishes).subscribe(
        result => {
          if (result) {
            this.fishes = result;
            setTimeout(() => {
              if (fishes$) {
                fishes$.unsubscribe();
              }
              resolve();
            }, 100);
          } else {
            this.fishes = [];
          }
        }
      );
    });
  }

  loadSeaCreatures() {
    return new Promise<void>(resolve => {
      this.store.dispatch(new LoadSeaCreatures());

      const seaCreatures$ = this.store.select(selectSeaCreatures).subscribe(
        result => {
          if (result) {
            this.seaCreatures = result;
            setTimeout(() => {
              if (seaCreatures$) {
                seaCreatures$.unsubscribe();
              }
              resolve();
            }, 100);
          } else {
            this.seaCreatures = [];
            resolve();
          }
        }
      );
    });
  }
}
