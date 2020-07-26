import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { LoadIslandFromDb } from './domains/island/island.actions';
import { AppState } from './app.state';
import {
  Plugins,
  StatusBarStyle,
  SplashScreen
} from '@capacitor/core';
import { DatabaseService } from './database/database.service';

const { StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private store: Store<AppState>,
    private dbService: DatabaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.waitForDbReady();
    });
  }

  waitForDbReady() {
    if (this.dbService.isOpen()) {
      if (this.platform.is('capacitor')) {
        SplashScreen.hide();
        StatusBar.setStyle({
          style: StatusBarStyle.Light
        });
      }
      this.store.dispatch(new LoadIslandFromDb());
      this.dbService.clearOldChores();

      // Use a Web Worker to parse JSON data in the background, while leaving the main thread free for UI to do its thing
      this.dbService.startParsingJsonData();
    } else {
      setTimeout(() => {
        this.waitForDbReady();
      }, 50);
    }
  }
}

