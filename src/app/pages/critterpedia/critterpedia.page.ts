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
  constructor(public utils: Utils, private platform: Platform, private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#B4D8E3' });
    }
  }
}
