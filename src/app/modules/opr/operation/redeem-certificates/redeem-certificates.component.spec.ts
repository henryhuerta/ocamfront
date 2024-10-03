import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemCertificatesComponent } from './redeem-certificates.component';

describe('RedeemCertificatesComponent', () => {
  let component: RedeemCertificatesComponent;
  let fixture: ComponentFixture<RedeemCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeemCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
