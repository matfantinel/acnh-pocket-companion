import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import { Platform } from '@ionic/angular';
import {
  Plugins
} from '@capacitor/core';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public utils: Utils, private platform: Platform) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#14c5b5' });
    } else {
      Utils.setThemeColor('#14c5b5');
    }
  }

}
