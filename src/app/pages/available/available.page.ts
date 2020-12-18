import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import { LoadingController, Platform } from '@ionic/angular';
import {
  Plugins
} from '@capacitor/core';
import { DatabaseService } from 'src/app/database/database.service';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-available',
  templateUrl: './available.page.html',
  styleUrls: ['./available.page.scss'],
})
export class AvailablePage implements OnInit {

  constructor(public utils: Utils, private platform: Platform, private dbService: DatabaseService, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#e1f47b' });
    } else {
      Utils.setThemeColor('#e1f47b');
    }
  }
}
