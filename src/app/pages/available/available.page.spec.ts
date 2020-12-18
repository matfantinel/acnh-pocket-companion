import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvailablePage } from './available.page';

describe('AvailablePage', () => {
  let component: AvailablePage;
  let fixture: ComponentFixture<AvailablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvailablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
