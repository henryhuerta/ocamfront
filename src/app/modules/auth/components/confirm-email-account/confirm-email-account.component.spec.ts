import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailAccountComponent } from './confirm-email-account.component';

describe('ConfirmEmailAccountComponent', () => {
  let component: ConfirmEmailAccountComponent;
  let fixture: ComponentFixture<ConfirmEmailAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEmailAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEmailAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
