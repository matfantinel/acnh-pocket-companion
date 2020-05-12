import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import { Store, select } from '@ngrx/store';
import { PlayerState, selectPlayerName } from 'src/app/reducers/player.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  today = new Date();
  playerName$: Observable<string>;

  constructor(private store: Store<PlayerState>, public utils: Utils) {
    this.playerName$ = this.store.pipe(select(selectPlayerName))
  }

  ngOnInit() {
  }

}
