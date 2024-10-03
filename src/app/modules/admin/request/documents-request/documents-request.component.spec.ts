import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsRequestComponent } from './documents-request.component';

describe('DocumentsRequestComponent', () => {
  let component: DocumentsRequestComponent;
  let fixture: ComponentFixture<DocumentsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
