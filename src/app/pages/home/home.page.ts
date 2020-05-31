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
      StatusBar.setBackgroundColor({ color: '#ECE0BA' });
    }
  }

  goToPage(event: any, color: string, route: string, icon: string, label: string) {
    let transitionEffectPixel = document.getElementById('transition-effect');    

    transitionEffectPixel.style.height = '1px';
    transitionEffectPixel.style.width = '1px';
    transitionEffectPixel.style.borderRadius = '50%';

    transitionEffectPixel.style.top = `${event.clientY}px`;
    transitionEffectPixel.style.left = `${event.clientX}px`;
    transitionEffectPixel.style.display = 'block';
    transitionEffectPixel.style.backgroundColor = color;

    let transitionIcon = (document.getElementById('transition-icon') as HTMLImageElement);
    transitionIcon.src = `assets/icons/${icon}.png`;
    transitionIcon.style.display = 'block';
    transitionIcon.style.height = '1px';
    transitionIcon.style.width = '1px';
    transitionIcon.style.top = `${event.clientY}px`;
    transitionIcon.style.left = `${event.clientX}px`;

    let transitionLabel = document.getElementById('transition-label');

    transitionLabel.textContent = label;
    transitionLabel.style.display = 'block';
    transitionLabel.style.opacity = '0';

    setTimeout(() => {
      transitionEffectPixel.style.transition = 'all .5s ease-in-out';
      transitionEffectPixel.style.top = '0px';
      transitionEffectPixel.style.left = '0px';
      transitionEffectPixel.style.height = '100vh';
      transitionEffectPixel.style.width = '100vw';
      transitionEffectPixel.style.borderRadius = '0px';

      transitionIcon.style.transition = 'all .5s ease-in-out';
      transitionIcon.style.height = '90px';
      transitionIcon.style.width = '90px';
      transitionIcon.style.top = 'calc(50% - 45px)';
      transitionIcon.style.left = 'calc(50% - 45px)';

      transitionLabel.style.transition = 'all 1s ease-in-out';
      transitionLabel.style.opacity = '1';

      setTimeout(() => {
        StatusBar.setBackgroundColor({ color: color });
      }, 500)

      setTimeout(() => {
        this.router.navigate([route]);

        setTimeout(() => {
          transitionEffectPixel.style.display = 'none';
          transitionEffectPixel.style.transition = 'none';

          transitionIcon.style.display = 'none';
          transitionIcon.style.transition = 'none';

          transitionLabel.style.display = 'none';
          transitionLabel.style.transition = 'none';
        }, 300)
      }, 1500);
    }, 100);
  }
}
