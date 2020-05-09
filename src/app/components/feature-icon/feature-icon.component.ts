import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feature-icon',
  templateUrl: './feature-icon.component.html',
  styleUrls: ['./feature-icon.component.scss'],
})
export class FeatureIconComponent implements OnInit {

  @Input() label: string;
  @Input() color: string;
  @Input() icon: string;
  @Input() route: string;

  public imageSrc: string;

  constructor() { }

  ngOnInit() {
    this.imageSrc =  `assets/icons/${this.icon}.png`;
  }

}
