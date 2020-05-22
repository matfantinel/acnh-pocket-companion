import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { select, Store } from '@ngrx/store';
import { selectPlayer, AppState } from 'src/app/reducers';
import { SavePlayer } from 'src/app/actions/player.actions';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.page.html',
  styleUrls: ['./passport.page.scss'],
})
export class PassportPage implements OnInit {

  player: Player;

  constructor(public utils: Utils, private store: Store<AppState>) {}

  ngOnInit() {
    this.loadPlayer();
  }

  loadPlayer() {
    this.store.select(selectPlayer).subscribe(
      result => {
        if (result) {
          this.player = {...result};
        } else {
          this.player = new Player();
        }
      }
    )
  }

  savePlayer() {
    this.store.dispatch(new SavePlayer({playerData: this.player}));
  }
}
