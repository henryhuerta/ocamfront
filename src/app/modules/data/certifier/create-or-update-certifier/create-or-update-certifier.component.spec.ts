import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateCertifierComponent } from './create-or-update-certifier.component';

describe('CreateOrUpdateCertifierComponent', () => {
  let component: CreateOrUpdateCertifierComponent;
  let fixture: ComponentFixture<CreateOrUpdateCertifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateCertifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateCertifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
