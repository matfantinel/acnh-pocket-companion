import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-island',
  templateUrl: './island.page.html',
  styleUrls: ['./island.page.scss'],
})
export class IslandPage implements OnInit {

  constructor(public utils: Utils) { }

  ngOnInit() {
  }

}
