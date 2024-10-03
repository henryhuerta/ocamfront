import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCertificatesComponent } from './transfer-certificates.component';

describe('TransferCertificatesComponent', () => {
  let component: TransferCertificatesComponent;
  let fixture: ComponentFixture<TransferCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
