import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBookSnapshotComponent } from './order-book-snapshot.component';

describe('OrderBookSnapshotComponent', () => {
  let component: OrderBookSnapshotComponent;
  let fixture: ComponentFixture<OrderBookSnapshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBookSnapshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBookSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
