import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chore-checkbox',
  templateUrl: './chore-checkbox.component.html',
  styleUrls: ['./chore-checkbox.component.scss']
})
export class ChoreCheckboxComponent implements OnInit {

  @Input() label: string;
  @Input() icon: string;

  @Input() state: boolean;
  @Output() stateChange = new EventEmitter();

  public imageSrc: string;

  constructor() { }

  ngOnInit() {
    this.imageSrc =  `assets/icons/${this.icon}.png`;
  }

  toggleState() {
    this.state = !this.state;
    this.stateChange.emit(this.state);
  }

}
