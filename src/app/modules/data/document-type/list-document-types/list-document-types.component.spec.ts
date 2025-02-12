import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocumentTypesComponent } from './list-document-types.component';

describe('ListDocumentTypesComponent', () => {
  let component: ListDocumentTypesComponent;
  let fixture: ComponentFixture<ListDocumentTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDocumentTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDocumentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
