import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeBookComponent } from './real-time-book.component';

describe('RealTimeBookComponent', () => {
  let component: RealTimeBookComponent;
  let fixture: ComponentFixture<RealTimeBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
