import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CritterpediaPage } from './critterpedia.page';

describe('CritterpediaPage', () => {
  let component: CritterpediaPage;
  let fixture: ComponentFixture<CritterpediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CritterpediaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CritterpediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
