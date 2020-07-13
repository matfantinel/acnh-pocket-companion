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

  ngOnInit() { }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#ECE0BA' });
    }
  }

  goToPage(event: any, color: string, route: string, icon: string, label: string) {

    const animationLength = 200;
    const expandAnimationTimeout = 50;
    const statusbarBackgroundChangeTimeout = expandAnimationTimeout + 250;
    const doNavigationTimeout = expandAnimationTimeout + 750;
    const hideTransitionElementsTimeout = doNavigationTimeout + 300;

    //#region Part 0 - declare the parts of the animation and reset their state

    // transitionEffectPixel is an absolute div that will expand to fill the screen with the color
    const transitionEffectPixel = document.getElementById('transition-effect');

    transitionEffectPixel.style.height = '1px';
    transitionEffectPixel.style.width = '1px';
    transitionEffectPixel.style.borderRadius = '50%';

    transitionEffectPixel.style.top = `${event.clientY}px`;
    transitionEffectPixel.style.left = `${event.clientX}px`;
    transitionEffectPixel.style.display = 'block';
    transitionEffectPixel.style.backgroundColor = color;

    // transitionIcon and transitionLabel are the feature icon/label that will appear above transitionEffectPixel
    const transitionIcon = (document.getElementById('transition-icon') as HTMLImageElement);
    transitionIcon.src = `assets/icons/${icon}.png`;
    transitionIcon.style.display = 'block';
    transitionIcon.style.height = '1px';
    transitionIcon.style.width = '1px';
    transitionIcon.style.top = `${event.clientY}px`;
    transitionIcon.style.left = `${event.clientX}px`;

    const transitionLabel = document.getElementById('transition-label');
    transitionLabel.textContent = label;
    transitionLabel.style.display = 'block';
    transitionLabel.style.opacity = '0';

    //#endregion
    
    //#region Part 1 - Expand the pixel and "move" the icon from the click point to the center of the screen
    setTimeout(() => {
      transitionEffectPixel.style.transition = `all ${animationLength}ms ease-in-out`;
      transitionEffectPixel.style.top = '0px';
      transitionEffectPixel.style.left = '0px';
      transitionEffectPixel.style.height = '100vh';
      transitionEffectPixel.style.width = '100vw';
      transitionEffectPixel.style.borderRadius = '0px';

      transitionIcon.style.transition = `all ${animationLength}ms ease-in-out`;
      transitionIcon.style.height = '90px';
      transitionIcon.style.width = '90px';
      transitionIcon.style.top = 'calc(50% - 45px)';
      transitionIcon.style.left = 'calc(50% - 45px)';

      transitionLabel.style.transition = `all ${animationLength * 2}ms ease-in-out`;
      transitionLabel.style.opacity = '1';
    }, expandAnimationTimeout);
    //#endregion

    //#region Part 2 - on mobile, change the status bar background color to match the animation background
    if (this.platform.is('capacitor')) {
      setTimeout(() => {
        StatusBar.setBackgroundColor({ color: color });
      }, statusbarBackgroundChangeTimeout)
    }
    //#endregion

    //#region Part 3 - Navigate/Change route
    setTimeout(() => {
      this.router.navigate([route]);
    }, doNavigationTimeout);
    //#endregion

    //#region Part 4 - Hide transition elements
    setTimeout(() => {
      transitionEffectPixel.style.display = 'none';
      transitionEffectPixel.style.transition = 'none';

      transitionIcon.style.display = 'none';
      transitionIcon.style.transition = 'none';

      transitionLabel.style.display = 'none';
      transitionLabel.style.transition = 'none';
    }, hideTransitionElementsTimeout);
    //#endregion
  }
}
