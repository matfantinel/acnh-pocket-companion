import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SavePassport } from 'src/app/domains/passport/passport.actions';
import { Passport } from 'src/app/domains/passport/passport.model';
import { selectPassport } from 'src/app/domains/passport/passport.reducer';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.page.html',
  styleUrls: ['./passport.page.scss'],
})
export class PassportPage implements OnInit {

  model: Passport;
  dirty: boolean;

  constructor(public utils: Utils, private store: Store<AppState>) {}

  ngOnInit() {
    this.loadPassport();
  }

  loadPassport() {
    this.store.select(selectPassport).subscribe(
      result => {
        if (result) {
          this.model = {...result};
        } else {
          this.model = new Passport();
        }
      }
    )
  }

  savePassport = () => {
    this.store.dispatch(new SavePassport({data: this.model}));
  }

  setDirty() {
    this.dirty = true;
  }
}
