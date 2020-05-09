import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PassportPage } from './passport.page';

describe('PassportPage', () => {
  let component: PassportPage;
  let fixture: ComponentFixture<PassportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PassportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
