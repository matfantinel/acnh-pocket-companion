import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import {
  Plugins
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-chores',
  templateUrl: './chores.page.html',
  styleUrls: ['./chores.page.scss'],
})
export class ChoresPage implements OnInit {

  constructor(public utils: Utils, private platform: Platform) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.platform.is('mobile')) {
      StatusBar.setBackgroundColor({ color: '#FECFAC' });
    }
  }

}
