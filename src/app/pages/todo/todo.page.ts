import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import {
  Plugins
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  constructor(public utils: Utils, private platform: Platform) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.platform.is('mobile')) {
      StatusBar.setBackgroundColor({ color: '#FFC9D3' });
    }
  }

}
