import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateDocumentTypeComponent } from './create-or-update-document-type.component';

describe('CreateOrUpdateDocumentTypeComponent', () => {
  let component: CreateOrUpdateDocumentTypeComponent;
  let fixture: ComponentFixture<CreateOrUpdateDocumentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateDocumentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateDocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
