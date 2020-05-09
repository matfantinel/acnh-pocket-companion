import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  constructor(public utils: Utils) { }

  ngOnInit() {
  }

}
