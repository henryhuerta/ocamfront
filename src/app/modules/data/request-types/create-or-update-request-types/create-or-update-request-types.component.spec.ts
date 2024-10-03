import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateRequestTypesComponent } from './create-or-update-request-types.component';

describe('CreateOrUpdateRequestTypesComponent', () => {
  let component: CreateOrUpdateRequestTypesComponent;
  let fixture: ComponentFixture<CreateOrUpdateRequestTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateRequestTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateRequestTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
