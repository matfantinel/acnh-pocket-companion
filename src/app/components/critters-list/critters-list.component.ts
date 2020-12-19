import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonToolbar } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SetSelectedItem, UpsertBug, UpsertFish, UpsertFossil, UpsertSeaCreature, UpsertVillager } from 'src/app/domains/critterpedia/critterpedia.actions';
import { CritterBase } from 'src/app/domains/critterpedia/critterpedia.model';

@Component({
  selector: 'app-critters-list',
  templateUrl: './critters-list.component.html',
  styleUrls: ['./critters-list.component.scss'],
})
export class CrittersListComponent implements OnInit {

  @Input() items: Array<CritterBase>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {}

  openDetails(item: any) {
    this.store.dispatch(new SetSelectedItem({ data: { ...item } }));
    this.router.navigate(['critterpedia/details']);
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
      case 'villagers':
        this.store.dispatch(new UpsertVillager({ data: { ...item } }));
        break;
    }
  }
}
