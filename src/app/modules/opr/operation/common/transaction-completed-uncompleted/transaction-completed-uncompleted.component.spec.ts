import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCompletedUncompletedComponent } from './transaction-completed-uncompleted.component';

describe('TransactionCompletedUncompletedComponent', () => {
  let component: TransactionCompletedUncompletedComponent;
  let fixture: ComponentFixture<TransactionCompletedUncompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCompletedUncompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCompletedUncompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
