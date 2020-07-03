import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreCheckboxComponent } from './chore-checkbox.component';

describe('ChoreCheckboxComponent', () => {
  let component: ChoreCheckboxComponent;
  let fixture: ComponentFixture<ChoreCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoreCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoreCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
