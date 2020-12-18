import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import { LoadingController, Platform } from '@ionic/angular';
import {
  Plugins
} from '@capacitor/core';
import { DatabaseService } from 'src/app/database/database.service';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public utils: Utils, private platform: Platform, private dbService: DatabaseService, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#A2BDCD' });
    } else {
      Utils.setThemeColor('#A2BDCD');
    }
  }

  async clearData() {
    if (confirm('Are you sure you want to clear data? You will lose everything!')) {
      this.dbService.clearData();

      const loading = await this.loadingController.create({
        message: 'Clearing data...',
        duration: 2000
      });
      loading.present();

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }
}
