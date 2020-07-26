import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Utils } from 'src/utils';
import { Platform, IonSlides, IonInput } from '@ionic/angular';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Island } from 'src/app/domains/island/island.model';
import { selectIsland } from 'src/app/domains/island/island.reducer';
import { SaveIsland } from 'src/app/domains/island/island.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts = {
    speed: 400
  };

  @ViewChild('slider', { static: true }) slider: IonSlides;
  @ViewChild('playerName', { static: true }) playerName: IonInput;

  island: Island;

  farthestStep = 0;

  constructor(public utils: Utils, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.loadIsland();
  }

  next(target: number) {
    if (target === 3 && !this.island.residentRepresentative.name.trim() ||
      target === 4 && (!this.island.name.trim() || !this.island.fruit || !this.island.hemisphere)) {
      return;
    } else if (target === 2) {
      setTimeout(() => {
        this.playerName.setFocus();
      }, 400);
    }

    if (target > this.farthestStep) {
      this.farthestStep = target;
    }

    this.slider.lockSwipeToNext(false);
    this.slider.slideNext();
    this.slider.lockSwipeToNext(true);
  }

  slidPrev() {
    this.slider.lockSwipeToNext(false);
  }

  async slidNext() {
    if ((await this.slider.getActiveIndex() + 1) >= this.farthestStep) {
      this.slider.lockSwipeToNext(true);
    }
  }

  loadIsland() {
    this.store.select(selectIsland).subscribe(
      result => {
        if (result) {
          this.island = { ...result };
          this.island.residentRepresentative = { ...result.residentRepresentative }
        } else {
          this.island = new Island();
        }
      }
    )
  }

  saveIsland = () => {
    this.store.dispatch(new SaveIsland({ data: this.island }));
  }

  saveAndNext(target: number) {
    this.saveIsland();
    this.next(target);
  }

  goHome() {
    this.router.navigate(['home']);
  }

}
