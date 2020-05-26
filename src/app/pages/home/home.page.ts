import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectIslandName, selectResidentRepresentativeName } from 'src/app/domains/island/island.reducer';
import {
  Plugins
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  today = new Date();
  playerName$: Observable<string>;
  islandName$: Observable<string>;

  constructor(public utils: Utils, private store: Store<AppState>, private platform: Platform, private router: Router) {
    this.islandName$ = this.store.pipe(select(selectIslandName));
    this.playerName$ = this.store.pipe(select(selectResidentRepresentativeName));
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.platform.is('mobile')) {
      StatusBar.setBackgroundColor({ color: '#f5f2e3' });
    }
  }

  goToPage(event: any, color: string, route: string) {
    let transitionEffectPixel = document.getElementById('transition-effect');

    transitionEffectPixel.style.height = '1px';
    transitionEffectPixel.style.width = '1px';
    transitionEffectPixel.style.borderRadius = '50%';

    transitionEffectPixel.style.top = `${event.clientY}px`;
    transitionEffectPixel.style.left = `${event.clientX}px`;
    transitionEffectPixel.style.display = 'block';
    transitionEffectPixel.style.backgroundColor = color;

    setTimeout(() => {
      transitionEffectPixel.style.transition = 'all .5s ease-in-out';
      transitionEffectPixel.style.top = '0px';
      transitionEffectPixel.style.left = '0px';
      transitionEffectPixel.style.height = '100vh';
      transitionEffectPixel.style.width = '100vw';
      transitionEffectPixel.style.borderRadius = '0px';

      setTimeout(() => {
        this.router.navigate([route]);

        setTimeout(() => {
          transitionEffectPixel.style.display = 'none';
          transitionEffectPixel.style.transition = 'none';
        }, 300)
      }, 1500);
    }, 10);
  }
}
