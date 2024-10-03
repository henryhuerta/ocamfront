import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateRequestTypeDocumentComponent } from './create-or-update-request-type-document.component';

describe('CreateOrUpdateRequestTypeDocumentComponent', () => {
  let component: CreateOrUpdateRequestTypeDocumentComponent;
  let fixture: ComponentFixture<CreateOrUpdateRequestTypeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateRequestTypeDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateRequestTypeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
