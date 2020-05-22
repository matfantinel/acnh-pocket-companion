import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectPassportName } from 'src/app/domains/passport/passport.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  today = new Date();
  playerName$: Observable<string>;

  constructor(public utils: Utils, private store: Store<AppState>) {
    this.playerName$ = this.store.pipe(select(selectPassportName));
  }

  ngOnInit() {
  }

}
