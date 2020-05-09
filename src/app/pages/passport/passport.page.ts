import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.page.html',
  styleUrls: ['./passport.page.scss'],
})
export class PassportPage implements OnInit {

  constructor(public utils: Utils) { }

  ngOnInit() {
  }

}
