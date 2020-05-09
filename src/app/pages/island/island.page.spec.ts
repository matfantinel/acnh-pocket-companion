import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IslandPage } from './island.page';

describe('IslandPage', () => {
  let component: IslandPage;
  let fixture: ComponentFixture<IslandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslandPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IslandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
