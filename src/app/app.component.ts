import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Store } from '@ngrx/store';
import { LoadIslandFromDb } from './domains/island/island.actions';
import { AppState } from './app.state';
import {
  Plugins,
  StatusBarStyle,
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
    private splashScreen: SplashScreen,
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
      this.splashScreen.hide();

      if (this.platform.is('capacitor')) {
        StatusBar.setStyle({
          style: StatusBarStyle.Light
        });
      }
      this.store.dispatch(new LoadIslandFromDb());
    } else {
      setTimeout(() => {
        this.waitForDbReady();
      }, 50);
    }
  }
}
