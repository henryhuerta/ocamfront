import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateAccountTypeComponent } from './create-or-update-account-type.component';

describe('CreateOrUpdateAccountTypeComponent', () => {
  let component: CreateOrUpdateAccountTypeComponent;
  let fixture: ComponentFixture<CreateOrUpdateAccountTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateAccountTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
