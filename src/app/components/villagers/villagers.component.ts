import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Villager } from 'src/app/domains/critterpedia/critterpedia.model';
import { LoadVillagers, UpsertVillager, SetSelectedItem } from 'src/app/domains/critterpedia/critterpedia.actions';
import { selectVillagers, selectCaughtVillagers } from 'src/app/domains/critterpedia/critterpedia.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-villagers',
  templateUrl: './villagers.component.html',
  styleUrls: ['./villagers.component.scss'],
})
export class VillagersComponent implements OnInit {
  villagers: Villager[] = [];
  caughtVillagers: Villager[] = [];

  isSearching: boolean;
  searchFilter: string;
  searchResults: Villager[] = [];
  
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.store.dispatch(new LoadVillagers());

    this.store.select(selectCaughtVillagers).subscribe(
      result => {
        if (result) {
          this.caughtVillagers = result;
        } else {
          this.caughtVillagers = [];
        }
      }
    );

    this.store.select(selectVillagers).subscribe(
      result => {
        if (result) {
          this.villagers = result;
        } else {
          this.villagers = [];
        }
      }
    );
  }

  toggleCaught(event: any, item: any) {
    event.preventDefault();
    event.stopPropagation();

    item.caught = !item.caught;
    this.store.dispatch(new UpsertVillager({ data: { ...item } }));
  }

  applySearchFilter() {
    const filter = this.searchFilter.trim();
    if (!filter) {
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.searchResults = this.villagers.filter(q => q.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
    }
  }

  openDetails(item: any) {
    this.store.dispatch(new SetSelectedItem({ data: { ...item } }));
    this.router.navigate(['critterpedia/details']);
  }
}