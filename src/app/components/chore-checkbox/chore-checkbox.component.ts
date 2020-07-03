import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chore-checkbox',
  templateUrl: './chore-checkbox.component.html',
  styleUrls: ['./chore-checkbox.component.scss']
})
export class ChoreCheckboxComponent implements OnInit {

  @Input() label: string;
  @Input() icon: string;

  public imageSrc: string;

  constructor() { }

  ngOnInit() {
    this.imageSrc =  `assets/icons/${this.icon}.png`;
  }

}
