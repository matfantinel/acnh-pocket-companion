import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-cool-header',
  templateUrl: './cool-header.component.html',
  styleUrls: ['./cool-header.component.scss'],
})
export class CoolHeaderComponent implements OnInit {


  @Input() title: string;
  @Input() color: string;

  @ViewChild('toolbar', { static: false }) toolbar: ElementRef;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      (this.toolbar as any).el.style.setProperty('--background', this.color);
    }, 0)
  }

}
