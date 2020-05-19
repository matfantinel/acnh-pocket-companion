import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  today = new Date();
  playerName: string;

  constructor(public utils: Utils) {
    this.playerName = 'Your Name'
  }

  ngOnInit() {
  }

}
