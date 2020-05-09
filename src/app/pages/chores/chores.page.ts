import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-chores',
  templateUrl: './chores.page.html',
  styleUrls: ['./chores.page.scss'],
})
export class ChoresPage implements OnInit {

  constructor(public utils: Utils) { }

  ngOnInit() {
  }

}
