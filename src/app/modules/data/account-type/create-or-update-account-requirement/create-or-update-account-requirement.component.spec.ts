import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateAccountRequirementComponent } from './create-or-update-account-requirement.component';

describe('CreateOrUpdateAccountRequirementComponent', () => {
  let component: CreateOrUpdateAccountRequirementComponent;
  let fixture: ComponentFixture<CreateOrUpdateAccountRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateAccountRequirementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateAccountRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
