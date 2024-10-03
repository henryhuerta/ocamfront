import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelCertificatesComponent } from './cancel-certificates.component';

describe('CancelCertificatesComponent', () => {
  let component: CancelCertificatesComponent;
  let fixture: ComponentFixture<CancelCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
