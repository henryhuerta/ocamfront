import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestByTypeComponent } from './create-request-by-type.component';

describe('CreateRequestByTypeComponent', () => {
  let component: CreateRequestByTypeComponent;
  let fixture: ComponentFixture<CreateRequestByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRequestByTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRequestByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
