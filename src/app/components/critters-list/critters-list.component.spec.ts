import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrittersListComponent } from './cool-header.component';

describe('CrittersListComponent', () => {
  let component: CrittersListComponent;
  let fixture: ComponentFixture<CrittersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrittersListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrittersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
