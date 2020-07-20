import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Utils } from 'src/utils';

const { StatusBar } = Plugins;

@Component({
  selector: 'app-critterpedia',
  templateUrl: './critterpedia.page.html',
  styleUrls: ['./critterpedia.page.scss'],
})
export class CritterpediaPage implements OnInit {

  activeSegment = 'bugs';

  bugs: any[] = [];
  fishes: any[] = [];
  seaCreatures: any[] = [];
  fossils: any[] = [];

  constructor(public utils: Utils, private platform: Platform, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.loadBugs();
    this.loadFishes();
    this.loadSeaCreatures();
    this.loadFossils();
  }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#B4D8E3' });
    }
  }

  segmentChanged(event: any) {
    this.activeSegment = event.detail.value;
  }

  loadBugs(event?: any) {
    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.bugs.push({
          name: `Bug ${i + 1}`
        });
      }

      if (event && event.target) {
        // When loading is finished:
        event.target.complete();
      }

      if (this.bugs.length >= 120) {
        // When reached the end of data:
        event.target.disabled = true;
      }
    }, 500);
  }

  loadFishes(event?: any) {
    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.fishes.push({
          name: `Fish ${i + 1}`
        });
      }

      if (event && event.target) {
        // When loading is finished:
        event.target.complete();
      }

      if (this.fishes.length >= 120) {
        // When reached the end of data:
        event.target.disabled = true;
      }
    }, 500);
  }

  loadSeaCreatures(event?: any) {
    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.seaCreatures.push({
          name: `Sea Creature ${i + 1}`
        });
      }

      if (event && event.target) {
        // When loading is finished:
        event.target.complete();
      }

      if (this.seaCreatures.length >= 120) {
        // When reached the end of data:
        event.target.disabled = true;
      }
    }, 500);
  }

  loadFossils(event?: any) {
    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.fossils.push({
          name: `Fossil ${i + 1}`
        });
      }

      if (event && event.target) {
        // When loading is finished:
        event.target.complete();
      }

      if (this.fossils.length >= 120) {
        // When reached the end of data:
        event.target.disabled = true;
      }
    }, 500);
  }
}
