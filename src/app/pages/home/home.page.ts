import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public today = new Date();

  constructor(public utils: Utils) { }

  ngOnInit() {
  }

}
